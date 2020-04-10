const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");
const setLocation = require("../utils/setLocation");

module.exports = {
  async index(request, response) {
    const allDevs = await Dev.find();

    try {
      return response.status(200).json(allDevs);
    } catch (error) {
      return response.status(400).json({ error: "Cannot load users from db" });
    }
  },

  async store(request, response) {
    const { github_username, techs, longitude, latitude } = request.body;

    let dev = await Dev.findOne({ github_username });

    if (dev)
      return response.status(401).json("Github user is already registered.");

    if (!dev) {
      try {
        const apiResponse = await axios.get(
          `https://api.github.com/users/${github_username}`
        );

        if (apiResponse.error === 404) console.log("blah");
        const { name = login, avatar_url, bio } = apiResponse.data;

        const techsArray = parseStringAsArray(techs);

        const location = setLocation(longitude, latitude);

        dev = await Dev.create({
          github_username,
          name,
          avatar_url,
          bio,
          techs: techsArray,
          location,
        });
      } catch (error) {
        if(error.message === 'Request failed with status code 404')
          return response.status(404).json({ error: 'Github username does not exists.'});
        
        return response.status(400).json(error)
      }
    }

    return response.status(200).json(dev);
  },

  async update(request, response) {
    const { id } = request.params;
    const { github_username, techs, longitude, latitude } = request.body;

    let dev = await Dev.findById(id);

    if (dev.github_username !== github_username)
      return response
        .status(401)
        .json({ error: "Github username cannot be changed." });

    if (!dev)
      return response.status(400).json({ error: "Dev cannot be found." });

    if (dev) {
      const apiResponse = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const { name = login, avatar_url, bio } = apiResponse.data;

      const techsArray = parseStringAsArray(techs);

      const location = setLocation(longitude, latitude);

      await Dev.findByIdAndUpdate(id, {
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      });

      dev = await Dev.findById(id);
    }

    return response.status(200).json(dev);
  },

  async destroy(request, response) {
    const { id } = request.params;

    let dev = await Dev.findOneAndDelete(id);

    if (!dev)
      return response.status(400).json({ error: "Dev cannot be found." });

    return response.status(204).send();
  },
};
