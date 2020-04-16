const User = require("../models/User");

module.exports = {
  create(req, res) {
    return res.render("admin/user/create");
  },
  async list(req, res) {
    const users = await User.all();

    return res.render("admin/user/index", { users });
  },
  async edit(req, res) {
    const id = req.params.id;
    user = await User.findOne({ where: { id } });

    res.render("admin/user/edit", { user });
  },
  async post(req, res) {
    const userId = await User.create(req.body);

    req.session.userId = userId;

    return res.redirect("/admin/users");
  },
  async put(req, res) {
    try {
      let { id, name, email, is_admin } = req.body;
      console.log(req.body);
      if (!is_admin) is_admin = false;

      await User.update(id, {
        name,
        email,
        is_admin,
      });

      return res.render(`admin/user/edit`, {
        user: req.body,
        success: "Conta atualizada com sucesso!",
      });
    } catch (err) {
      console.error(err);
      return res.render(`admin/user/edit`, {
        error: "Algum erro aconteceu!",
      });
    }
  },
};
