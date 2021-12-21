const createResponse = (
  data = null,
  status = true,
  message = "Your Message",
  code = 200,
  ...args
) => {
  return { data: data, status: status, message: message, code: code, ...args};
};

const createError = (
  code = 200,
  message = "Error Message",
  status = false,
  data = null,
) => {
  return { code: code, status: status, message: message, data: data };
}


module.exports= {
    createResponse,
    createError
}
