import joi, { ValidationError } from 'joi';
import { Request, Response, NextFunction } from 'express';

const listing = joi.object({
  limit: joi.number().required(),
  page: joi.number().required(),
  sortBy: joi.string().required(),
  sort: joi.number().required(),
  searchBy: joi.string().optional(),
  keyword: joi.string().optional(),
});

const User = joi.object({
  name: joi.string().min(5).max(20).optional().messages({ 'any.required': 'Name is required' }),
  age: joi.number().required().min(0).max(100),
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

const validationUserMiddleware = async (req: Request, res: Response, next: NextFunction, schema: string) => {
  const option = {
    abortEarly: false,
    allowUnknown: false,
  };

  let validationError: ValidationError | null = null;

  if (schema === 'Listing') {
    const { error: listingError } = listing.validate(req.query, option);
    validationError = listingError || null;
  }

  if (schema === 'User') {
    const { error: userError } = User.validate(req.body, option);
    validationError = userError || null;
  }

  if (schema === 'Login') {
    const { error: loginUserError } = login.validate(req.body, option);
    validationError = loginUserError || null;
  }

  if (validationError) {
    res.status(400).json({ validationError: validationError.details[0].message });
  } else {
    next();
  }
};

export default validationUserMiddleware;
