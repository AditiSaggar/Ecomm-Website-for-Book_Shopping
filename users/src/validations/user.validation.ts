import joi from 'joi';

const listing = joi.object({
  limit: joi.number().required(),
  page: joi.number().required(),
  sortBy: joi.string().required(),
  sort: joi.number().required(),
  searchBy: joi.string().optional(),
  keyword: joi.string().optional(),
});

const user = joi.object({
  name: joi.string().min(5).max(20).optional().messages({ 'any.required': 'Name is a required' }),
  age: joi.string().required().min(0).max(100),
  email: joi.string().email().required(),
  password: joi.string().min(6).optional(),
  address: joi.string().max(30).optional(),
  contact: joi.number().integer().min(100000000).max(9999999999).required(),
  role: joi.string().required(),
});

const login = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

const validationUserMiddleware = async (req: any, res: any, next: any, schema: string) => {
  const option = {
    abortEarly: false,
    allowUnknown: false,
  };

  if (schema == 'listing') {
    var { error } = listing.validate(req.query, option);
  }

  if (schema == 'user') {
    var { error } = user.validate(req.body, option);
  }

  if (schema == 'login') {
    var { error } = login.validate(req.body, option);
  }

  if (error) {
    res.status(400).json({ validationError: error.details[0].message });
  } else {
    next();
  }
};

export default validationUserMiddleware;
