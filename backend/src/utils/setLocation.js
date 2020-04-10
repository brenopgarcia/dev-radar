module.exports = setLocation = (longitude, latitude) => {
  return {
    type: "Point",
    coordinates: [longitude, latitude],
  };
}