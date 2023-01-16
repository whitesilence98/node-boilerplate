export const apiBuilder = async (model: any, params: any, searchFields: any = []) => {
   let queryObj = {...params};

   ["page", "sort", "limit", "fields"].forEach((k: string) => delete queryObj[k]);

   let queryStr = JSON.stringify(queryObj);
   queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

   const conditions = JSON.parse(queryStr);
   Object.keys(conditions).forEach(k => {
      if (!searchFields.includes(k)) return;
      conditions[k] = new RegExp(conditions[k], "i");
   });

   let query = model.find(conditions);

   if (params.fields) {
      query = query.select(params.fields.split(",").join(" "));
   }

   if (params.sort) {
      query = query.sort(params.sort);
   }

   return await query;
};

export const paginationHandler = async (model: any, params?: any, query?: any) => {
   let data = params || query;
   console.log("🐳 Win -> data", data);
   let {page, size, skip} = data;
   page = +page;
   size = +size;
   skip = +skip;
   if (!page) page = 1;
   if (!size) size = 10;
   if (!skip) skip = 0;
   const total = await model.countDocuments();
   const total_page = Math.ceil((total - skip) / size);
   const next = page + 1 > total_page ? null : page + 1;
   const previous = page - 1 || null;
   return {page: parseInt(page), total, total_page, previous, next};
};
