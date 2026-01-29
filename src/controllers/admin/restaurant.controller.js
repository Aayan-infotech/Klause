import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import mongoose from "mongoose";
import restaurantType from "../../models/restaurantTypes.modal.js";


export const saveRestuarantType = asyncHandler(async (req, res) => {
  const { type } = req.body;

  if (!type) {
    throw new ApiError(400, "TYPE_IS_REQUIRED", req.lang);
  }

  //check type
  const restType = await restaurantType.findOne({ name: type });
  if (restType) {
    throw new ApiError(400, "RESTAURANT_TYPE_IS_ALREADY_EXISTS", req.lang);
  }

  const saveStatus = await restaurantType.create({
    name: type,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "RESTAURANT_TYPE_IS_CREATED_SUCCESSFULLY",
        req.lang,
        saveStatus
      )
    );
});

export const getRestaurantTypes = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.max(1, parseInt(req.query.limit) || 10);
  const skip = (page - 1) * limit;

  const matchStage = {};

  if (req.query.status) {
    matchStage.status = req.query.status;
  }

  if (req.query.search) {
    matchStage.name = {
      $regex: req.query.search,
      $options: "i",
    };
  }

  const allowedSortFields = ["name", "status", "createdAt", "updatedAt"];
  const sortBy = allowedSortFields.includes(req.query.sortBy)
    ? req.query.sortBy
    : "createdAt";

  const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

  const sortStage = {
    [sortBy]: sortOrder,
  };

  const aggregation = [
    { $match: matchStage },

    { $sort: sortStage },

    {
      $facet: {
        types: [
          { $skip: skip },
          { $limit: limit },
          {
            $project: {
              name: 1,
              description: 1,
              status: 1,
              language: 1,
              createdAt: 1,
              updatedAt: 1,
            },
          },
        ],
        totalCount: [{ $count: "count" }],
      },
    },
  ];

  const result = await restaurantType.aggregate(aggregation);

  const types = result[0]?.types || [];
  const totalCount = result[0]?.totalCount[0]?.count || 0;
  const totalPages = Math.ceil(totalCount / limit);

  return res.status(200).json(
    new ApiResponse(
      200,
      types.length > 0
        ? "RESTAURANT_TYPES_FETCHED_SUCCESSFULLY"
        : "NO_RESTAURANT_TYPES_FOUND",
      req.lang,
      types.length > 0
        ? {
            types,
            total_page: totalPages,
            current_page: page,
            total_records: totalCount,
            per_page: limit,
            sort_by: sortBy,
            sort_order: sortOrder === 1 ? "asc" : "desc",
          }
        : null
    )
  );
});

export const updateRestaurantType = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { type, status } = req.body;

  // validate mongo id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "INVALID_RESTAURANT_TYPE_ID", req.lang);
  }

  // at least one field required
  if (!type && !status) {
    throw new ApiError(
      400,
      "AT_LEAST_ONE_FIELD_IS_REQUIRED_TO_UPDATE",
      req.lang
    );
  }

  // check restaurant type exists
  const restType = await restaurantType.findById(id);

  if (!restType) {
    throw new ApiError(404, "RESTAURANT_TYPE_NOT_FOUND", req.lang);
  }

  // if type is updating, check duplicate
  if (type) {
    const isTypeExists = await restaurantType.findOne({
      name: type,
      _id: { $ne: id },
    });

    if (isTypeExists) {
      throw new ApiError(400, "RESTAURANT_TYPE_IS_ALREADY_EXISTS", req.lang);
    }

    restType.name = type;
  }

  // update status
  if (status) {
    restType.status = status;
  }

  await restType.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "RESTAURANT_TYPE_UPDATED_SUCCESSFULLY",
        req.lang,
        restType
      )
    );
});
