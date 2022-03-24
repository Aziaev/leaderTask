import { message } from "antd";
import { get } from "lodash";
import React, { useCallback, useContext, useEffect, useState } from "react";

export const AppContext = React.createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [popularityReport, setPopularityReport] = useState([]);
  const [revenueReport, setRevenueReport] = useState([]);

  const fetchProducts = useCallback(async () => {
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
        return await handleNotOkReponse(response);
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

  const fetchPopularityReport = useCallback(async () => {
    setIsLoading(true);
    try {
      const headers = {
        "Content-Type": "application/json",
      };

      const url = "/api/products/report/popularity";
      const response = await fetch(url, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        return await handleNotOkReponse(response);
      }
      const json = await response.json();

      setPopularityReport(json.data.report);
    } catch (e) {
      message.error(e.message || "Неизвестная ошибка получения лидов");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchRevenueReport = useCallback(async () => {
    setIsLoading(true);
    try {
      const headers = {
        "Content-Type": "application/json",
      };

      const url = "/api/products/report/revenue";
      const response = await fetch(url, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        return await handleNotOkReponse(response);
      }

      const json = await response.json();

      setRevenueReport(json.data.report);
    } catch (e) {
      message.error(e.message || "Неизвестная ошибка получения лидов");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchAll = useCallback(async () => {
    try {
      await Promise.all([
        fetchProducts(),
        fetchRevenueReport(),
        fetchPopularityReport(),
      ]);
    } catch (e) {
      message.error(e.message || "Ошибка инициализации приложения");
    } finally {
      setIsLoading(false);
    }
  }, [fetchProducts, fetchRevenueReport, fetchPopularityReport]);

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
          return await handleNotOkReponse(response);
        }
        const json = await response.json();

        message.success(json.data.message);
      } catch (e) {
        message.error(e.message || "Неизвестная ошибка удаления");
      } finally {
        await fetchAll();
      }
    },
    [fetchAll]
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
          return await handleNotOkReponse(response);
        }

        const json = await response.json();

        message.success(json.data.message);
      } catch (e) {
        message.error(e.message || "Неизвестная ошибка удаления");
      } finally {
        fetchAll();
      }
    },
    [fetchAll]
  );

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <AppContext.Provider
      value={{
        products,
        isLoading,
        addProduct,
        deleteProduct,
        fetchPopularityReport,
        fetchRevenueReport,
        popularityReport,
        revenueReport,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

async function handleNotOkReponse(response) {
  const json = await response.json();
  const errorMessage =
    get(json, "error.message") || response.statusText || "Произошла ошибка";
  message.error(errorMessage);
}
