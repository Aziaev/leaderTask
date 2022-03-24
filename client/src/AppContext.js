import React, { useCallback, useContext, useEffect, useState } from "react";
import { message } from "antd";

export const AppContext = React.createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const fetchProducts = useCallback(async (token) => {
    setIsLoading(true);
    try {
      const headers = {
        "Content-Type": "application/json",
      };

      const url = "/api/products/";
      const response = await fetch(url, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        if (response.status === 401) {
          message.error(response.error);
        }
      }
      const json = await response.json();

      const {
        data: { list },
      } = json;

      setProducts(list);
    } catch (e) {
      message.error(e.message || "Неизвестная ошибка получения лидов");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addProduct = useCallback(
    async (product) => {
      setIsLoading(true);
      try {
        const headers = {
          "Content-Type": "application/json",
        };

        const url = `/api/products/create`;
        const response = await fetch(url, {
          method: "POST",
          headers,
          body: JSON.stringify(product),
        });

        if (!response.ok) {
          if (response.status === 401) {
            message.error(response.error);
          }
        }
        const json = await response.json();

        message.success(json.data.message);
      } catch (e) {
        message.error(e.message || "Неизвестная ошибка удаления");
      } finally {
        fetchProducts();
      }
    },
    [fetchProducts]
  );

  const deleteProduct = useCallback(
    async (id) => {
      setIsLoading(true);
      try {
        const headers = {
          "Content-Type": "application/json",
        };

        const url = `/api/products/${id}`;
        const response = await fetch(url, {
          method: "DELETE",
          headers,
        });

        if (!response.ok) {
          if (response.status === 401) {
            message.error(response.error);
          }
        }
        const json = await response.json();

        message.success(json.data.message);
      } catch (e) {
        message.error(e.message || "Неизвестная ошибка удаления");
      } finally {
        fetchProducts();
      }
    },
    [fetchProducts]
  );

  useEffect(() => {
    try {
      fetchProducts();
    } catch (e) {
      message.error(e.message || "Ошибка инициализации приложения");
    } finally {
      setIsLoading(false);
    }
  }, [fetchProducts]);

  return (
    <AppContext.Provider
      value={{
        products,
        isLoading,
        addProduct,
        deleteProduct,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
