const { Router } = require("express");
const router = Router();
const Product = require("../models/Product");
const { check, validationResult } = require("express-validator");
const { HTTP_STATUSES } = require("../constants");
const mockData = require("../mockData.json");
const { map } = require("lodash");

router.get("/", async (request, response) => {
  try {
    const list = await Product.find().sort({ createDate: "desc" });

    response.status(HTTP_STATUSES["200"]).json({
      data: {
        list,
      },
    });
  } catch (e) {
    response.status(HTTP_STATUSES["500"]).json({
      error: {
        message: e.message || "Что-то пошло не так, попробуйте снова",
        status: HTTP_STATUSES["500"],
      },
    });
  }
});

router.get("/report", async (request, response) => {
  try {
    const list = await Product.find().sort({ createDate: "asc" });

    if (list.length < 0) {
      await map(mockData, async (item) => {
        const product = new Product(item);

        await product.save();
      });
    }

    response.status(HTTP_STATUSES["200"]).json({
      data: {
        list,
      },
    });
  } catch (e) {
    response.status(HTTP_STATUSES["500"]).json({
      error: {
        message: e.message || "Что-то пошло не так, попробуйте снова",
        status: HTTP_STATUSES["500"],
      },
    });
  }
});

router.post(
  "/create",
  [
    check("product", "Некорректное название продукта").exists(),
    check("date", "Неправильный формат даты").isDate(),
    check("profit", "Некорректная сумма").isNumeric(),
    check("price", "Некорректная сумма").isNumeric(),
  ],

  async (request, response) => {
    try {
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        return response.status(HTTP_STATUSES["400"]).json({
          error: {
            errors: errors.array(),
            message: "Некорректные данные при создании",
            status: HTTP_STATUSES["400"],
          },
        });
      }
      const product = new Product(request.body);

      await product.save();

      response
        .status(HTTP_STATUSES["201"])
        .json({ data: { message: "Продукт добавлен" } });
    } catch (e) {
      response.status(HTTP_STATUSES["500"]).json({
        error: {
          message: e.message || "Что-то пошло не так, попробуйте снова",
          status: HTTP_STATUSES["500"],
        },
      });
    }
  }
);

router.delete("/:id", async (request, response) => {
  try {
    const _id = request.params.id;

    const product = await Product.findById({ _id });

    if (!product) {
      return response.status(HTTP_STATUSES["404"]).json({
        error: {
          message: `Продукт не найден`,
        },
      });
    }

    await Product.findByIdAndDelete(_id);

    response.status(HTTP_STATUSES["200"]).json({
      data: {
        message: `Объект ${_id} удален`,
      },
    });
  } catch (e) {
    response.status(HTTP_STATUSES["500"]).json({
      error: {
        message: e.message || "Что-то пошло не так, попробуйте снова",
        status: HTTP_STATUSES["500"],
      },
    });
  }
});

module.exports = router;
