import api from "./axios";

const register = (body: any) => {
  return new Promise((resolve, reject) => {
    api("post", null, `/user/register`, null, body, null)
      .then((response: any) => {
        resolve(response.data.results);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const login = (body: any) => {
  return new Promise((resolve, reject) => {
    api("post", null, `/user`, null, body, null)
      .then((response: any) => {
        resolve(response.data.results);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const updateVaccine = (body: any) => {
  return new Promise((resolve, reject) => {
    api("put", null, `/vaccine`, null, body, null)
      .then((response: any) => {
        resolve(response.data.results);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const createVaccine = (body: any) => {
  return new Promise((resolve, reject) => {
    api("post", null, `/vaccine`, null, body, null)
      .then((response: any) => {
        resolve(response.data.results);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const deleteVaccine = (id: any) => {
  return new Promise((resolve, reject) => {
    api("delete", null, `/vaccine/${id}`, null, null, null)
      .then((response: any) => {
        resolve(response.data.results);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getAllVaccine = () => {
  return new Promise((resolve, reject) => {
    api("get", null, `/vaccine`, null, null, null)
      .then((response: any) => {
        resolve(response.data.results);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const updateUser = (data: any) => {
  return new Promise((resolve, reject) => {
    api("put", null, `/user`, null, data, null)
      .then((response: any) => {
        resolve(response.data.results);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const updateAppointment = (data: any) => {
  return new Promise((resolve, reject) => {
    api("put", null, `/appointment`, null, data, null)
      .then((response: any) => {
        resolve(response.data.results);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getUserById = (id: any) => {
  return new Promise((resolve, reject) => {
    api("get", null, `/user/${id}`, null, null, null)
      .then((response: any) => {
        resolve(response.data.results?.user);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const changePassword = (data: any) => {
  return new Promise((resolve, reject) => {
    api("put", null, `/user/changePassword`, null, data, null)
      .then((response: any) => {
        resolve(response.data.results);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const deleteUser = (id: any) => {
  return new Promise((resolve, reject) => {
    api("delete", null, `/user/${id}`, null, null, null)
      .then((response: any) => {
        resolve(response.data.results);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getAllUsers = (name: any) => {
  return new Promise((resolve, reject) => {
    api(
      "get",
      null,
      `/user/search?page=0&size=1000&name=${name}&role=user`,
      null,
      null,
      null
    )
      .then((response: any) => {
        resolve(response.data.results);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getAllSearchVaccine = (name: any, hosId: any) => {
  return new Promise((resolve, reject) => {
    api(
      "get",
      null,
      `/vaccine/search?page=0&size=10000&name=${name}&hospitalId=${hosId}`,
      null,
      null,
      null
    )
      .then((response: any) => {
        resolve(response.data.results);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getAllHospital = () => {
  return new Promise((resolve, reject) => {
    api("get", null, `/user/role/hospital`, null, null, null)
      .then((response: any) => {
        resolve(response.data.results);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getAllSearchHospital = (name: any) => {
  return new Promise((resolve, reject) => {
    api(
      "get",
      null,
      `/user/search?page=0&size=1000&name=${name}&role=hospital`,
      null,
      null,
      null
    )
      .then((response: any) => {
        resolve(response.data.results);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const createAppointment = (body: any) => {
  return new Promise((resolve, reject) => {
    api("post", null, `/appointment`, null, body, null)
      .then((response: any) => {
        resolve(response.data.results);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getAllAppointment = (id: any, hosname: any) => {
  return new Promise((resolve, reject) => {
    api(
      "get",
      null,
      `/appointment/search?page=0&size=1000&userId=${id}&hospital=${hosname}`,
      null,
      null,
      null
    )
      .then((response: any) => {
        resolve(response.data.results);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getAllMyVaccines = (id: any) => {
  return new Promise((resolve, reject) => {
    api("get", null, `/appointment/user/${id}`, null, null, null)
      .then((response: any) => {
        resolve(response.data.results);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getAllAppointByUserId = (id: any) => {
  return new Promise((resolve, reject) => {
    api(
      "get",
      null,
      `/appointment/search?page=0&size=1000&userId=${id}&hospital=`,
      null,
      null,
      null
    )
      .then((response: any) => {
        resolve(response.data.results);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export {
  register,
  login,
  getAllVaccine,
  updateVaccine,
  deleteVaccine,
  createVaccine,
  getAllHospital,
  createAppointment,
  getAllAppointment,
  getAllSearchVaccine,
  getAllMyVaccines,
  getAllUsers,
  updateUser,
  deleteUser,
  getAllSearchHospital,
  getUserById,
  changePassword,
  getAllAppointByUserId,
  updateAppointment,
};
