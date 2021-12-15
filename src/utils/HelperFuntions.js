const createResponse = (
  data = null,
  status = true,
  message = "Your Message"
) => {
  return { data: data, status: status, message: message };
};


module.exports= {
    createResponse,
    
}
