//import model
const mongoose = require('mongoose')
const model = require("../../models/product");

//get product
module.exports = async (filters) => {
  let skip = filters.skip;
  let limit = filters.limit;
  delete filters.skip;
  delete filters.limit;

  let sortBy = {};

  if (process.env.SORT_BY_NAME == "true") sortBy["name"] = 1;
  else if (process.env.SORT_BY_TYPE == "true") sortBy["type_id.name"] = 1;
  else if (process.env.SORT_BY_CATEGORY == "true") sortBy["category_id.name"] = 1;
  else if (process.env.SORT_BY_CREATED_DATE == "true") sortBy["created_on"] = 1;
  else if (process.env.SORT_BY_DIVISION == "true") sortBy["division_id.name"] = 1;

  if (sortBy && Object.keys(sortBy).length === 0 && sortBy.constructor === Object) sortBy["created_on"] = -1;
   
  let searchFilters = {...filters};
  if(Array.isArray(filters.division_id)){
    searchFilters.division_id = {$in: []};
    filters.division_id.forEach(item => searchFilters.division_id.$in.push(mongoose.Types.ObjectId(`${item}`)));
  }
  else if(filters.division_id) searchFilters.division_id = mongoose.Types.ObjectId(`${filters.division_id}`);

  if(filters.type_id) searchFilters.type_id = mongoose.Types.ObjectId(`${filters.type_id}`);
  if(filters.category_id) searchFilters.category_id = mongoose.Types.ObjectId(`${filters.category_id}`);


  const rs = await model
    .aggregate([
      {
        $match: searchFilters,
      },
      {
        $lookup: {
          from: "divisions",
          localField: "division_id",
          foreignField: "_id",
          as: "division_id",
        },
      },
      {
        $lookup: {
          from: "product_types",
          localField: "type_id",
          foreignField: "_id",
          as: "type_id",
        },
      },
      {
        $lookup: {
          from: "product_categories",
          localField: "category_id",
          foreignField: "_id",
          as: "category_id",
        },
      },
      {
        $sort: { ...sortBy },
      },
      {
        $skip: skip || 0,
      },
      {
        $limit: limit || 100,
      }
    ])
    .collation({ locale: "es" });
  return rs;
};


  // console.log("SORT BY: ", sortBy)
  // let rs =  await model.find(filters)
  // let rs = await model
  //   .find({})
  //   .populate({ path: "division_id" })
  //   .populate({ path: "type_id" })
  //   .populate({ path: "category_id" })
  //   .skip(skip)
  //   .limit(limit)
  //   // .sort({'category_id.name':-1})
  //   .exec();