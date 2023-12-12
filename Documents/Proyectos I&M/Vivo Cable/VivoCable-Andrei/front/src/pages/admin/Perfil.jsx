import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Switch } from "@headlessui/react";
import {
  RiEdit2Line,
  RiErrorWarningLine,
  RiShieldCheckLine,
} from "react-icons/ri";

const Perfil = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <>
      {/* Profile */}
      <div className="bg-secondary-100 p-8 rounded-xl mb-8">
        <h1 className="text-xl text-gray-100">Profile</h1>
        <hr className="my-8 border-gray-500/30" />
        <form>
          <div className="flex items-center mb-8">
            <div className="w-1/4">
              <p>Avatar</p>
            </div>
            <div className="flex-1">
              <div className="relative mb-2">
                <img
                  src="https://img.freepik.com/psd-gratis/3d-ilustracion-persona-gafas-sol_23-2149436188.jpg?w=740&t=st=1695714880~exp=1695715480~hmac=c8b614cfeb459700a7bca30cbad9d51d8b69dc7179822c3e12048ff8ce4f9cf4"
                  className="w-28 h-28 object-cover rounded-lg"
                />
                <label
                  htmlFor="avatar"
                  className="absolute bg-secondary-100 p-2 rounded-full hover:cursor-pointer -top-2 left-24"
                >
                  <RiEdit2Line />
                </label>
                <input type="file" id="avatar" className="hidden"></input>
              </div>
              <p className="text-gray-500 text-sm">
                Allowed file types: png, jpg, jpeg.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-2 md:flex-row md:items-center mb-8">
            <div className="w-full md:w-1/4">
              <p>
                Nombre Completo <span className="text-red-500">*</span>
              </p>
            </div>
            <div className="flex-1 flex flex-center gap-4">
              <div className="w-full">
                <input
                  type="text"
                  className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                  placeholder="Nombre(s)"
                />
              </div>
              <div className="w-full">
                <input
                  type="text"
                  className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                  placeholder="Apellido(s)"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
            <div className="w-full md:w-1/4">
              <p>
                Empresa <span className="text-red-500">*</span>
              </p>
            </div>
            <div className="flex-1 flex flex-center gap-4">
              <input
                type="text"
                className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                placeholder="Nombre(s)"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
            <div className="w-full md:w-1/4">
              <p>
                Número <span className="text-red-500">*</span>
              </p>
            </div>
            <div className="flex-1 flex flex-center gap-4">
              <input
                type="text"
                className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                placeholder="Nombre(s)"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
            <div className="w-full md:w-1/4">
              <p>
                Pagina Web <span className="text-red-500">*</span>
              </p>
            </div>
            <div className="flex-1 flex flex-center gap-4">
              <input
                type="text"
                className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                placeholder="Nombre(s)"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
            <div className="w-full md:w-1/4">
              <p>
                País <span className="text-red-500">*</span>
              </p>
            </div>
            <div className="flex-1 flex flex-center gap-4">
              <select
                className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900
                        appearance-none"
              >
                <option value="Argentina" selected>
                  Argentina
                </option>
                <option value="Colombia">Colombia</option>
                <option value="México">México</option>
                <option value="Peru">Peru</option>
                <option value="Japón">Japón</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
            <div className="w-full md:w-1/4">
              <p>
                Ciudad <span className="text-red-500">*</span>
              </p>
            </div>
            <div className="flex-1 flex flex-center gap-4">
              <select
                className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900
                        appearance-none"
              >
                <option value="Argentina" selected>
                  Argentina
                </option>
                <option value="Colombia">Colombia</option>
                <option value="México">México</option>
                <option value="Peru">Peru</option>
                <option value="Japón">Japón</option>
              </select>
            </div>
          </div>
        </form>
        <hr className="my-8 border-gray-500/30" />
        <div className="flex justify-end">
          <button
            className="bg-primary/80 text-black py-2 px-4 rounded-lg hover:bg-primary
                transition-colors"
          >
            Guardar
          </button>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-secondary-100 p-8 rounded-xl mb-8">
        <h1 className="text-xl text-gray-100">Usuario y Contraseña</h1>
        <hr className="my-8 border-gray-500/30" />
        <form className="mb-8">
          <div className="flex flex-col md:flex-row md:itema-center gap-y-4 justify-between">
            <div>
              <h5 className="text-gray-100 text-xl">Correo Electronico</h5>
              <p className="text-gray-500 text-sm">daniza@gmail.com</p>
            </div>
            <div>
              <button
                className="w-full md:w-auto bg-secondary-900/50 py-2 px-4 rounded-lg hover:bg-secondary-900
                        hover:text-gray-100 transition-colors"
              >
                Cambiar Email
              </button>
            </div>
          </div>
          <hr className="my-8 border-gray-500/30 border-dashed" />
          <div className="flex flex-col md:flex-row md:items-center gap-y-4 justify-between">
            <div>
              <h5 className="text-gray-100 text-xl">Contraseña</h5>
              <p className="text-gray-500 text-sm">***************</p>
            </div>
            <div>
              <button
                className="w-full md:auto bg-secondary-900/50 py-3 px-4 rounded-lg hover:bg-secondary-900
                        hover:text-gray-100 transition-colors"
              >
                Cambiar Contraseña
              </button>
            </div>
          </div>
        </form>
        <div
          className="grid grid-cols-1 md:grid-cols-8 items-center gap-y-4 bg-pink-600/10 p-4 rounded-lg border 
            border-dashed border-pink-600"
        >
          <div className="flex justify-center">
            <RiShieldCheckLine className="text-5xl text-pink-600" />
          </div>
          <div className="md:col-span-6">
            <h5 className="text-gray-100 text-xl mb-2">Asegura Tu Cuenta</h5>
            <p className="text-gray-500">
              Two-factor authentication adds an extra layer of security to your
              account. To log in, in addition you'll need to provide a 6 digit
              code
            </p>
          </div>
          <div className="flex justify-center">
            <button
              className="bg-pink-600/70 hover:bg-pink-600 transition-colors py-2 px-4 
                    rounded-lg text-gray-100"
            >
              Activar
            </button>
          </div>
        </div>
      </div>

      {/* Connected Accounts */}
      <div className="bg-secondary-100 p-8 rounded-xl mb-8">
        <h1 className="text-xl text-gray-100">Conectar con Cuentas</h1>
        <hr className="my-8 border-gray-500/30" />
        <div
          className="flex flex-col md:flex-row  gap-4 items-center bg-pink-600/10 p-4 rounded-lg border 
            border-dashed border-pink-600 mb-8"
        >
          <div className="flex justify-center">
            <RiShieldCheckLine className="text-5xl text-pink-600" />
          </div>
          <div className="flex-1">
            <p className="text-gray-500">
              Two-factor authentication adds an extra layer of security to your
              account. To log in, in you'll to provide a 4 digit amazing code.{" "}
              <Link to="/" className="text-pink-400">
                Learn More
              </Link>
            </p>
          </div>
        </div>
        <form className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src="https://cdn.pixabay.com/photo/2015/12/11/11/43/google-1088004_1280.png"
                className="w-8 h-8 object-cover"
              />
              <div className="flex flex-col gap-y-1">
                <h5 className="text-gray-100">Google</h5>
                <p className="text-gray-500 text-sm">
                  Plan propety your workflow
                </p>
              </div>
            </div>
            <div>
              <Switch
                checked={enabled}
                onChange={setEnabled}
                className={`${
                  enabled ? "bg-primary" : "bg-secondary-900"
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span className="sr-only">Enabled Notifications</span>
                <span
                  className={`${
                    enabled
                      ? "translate-x-6 bg-secondary-900"
                      : "translate-x-1 bg-gray-500"
                  } inline-block h-4 w-4 transform rounded-full transition`}
                ></span>
              </Switch>
            </div>
          </div>
          <hr className="my-8 border-gray-500/30 border-dashed" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src="https://cdn.pixabay.com/photo/2017/08/05/11/24/logo-2582757_1280.png"
                className="w-8 h-8 object-cover"
              />
              <div className="flex flex-col gap-y-1">
                <h5 className="text-gray-100">GitHub</h5>
                <p className="text-gray-500 text-sm">
                  Keep eye on on your Repositories
                </p>
              </div>
            </div>
            <div>
              <Switch
                checked={enabled}
                onChange={setEnabled}
                className={`${
                  enabled ? "bg-primary" : "bg-secondary-900"
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span className="sr-only">Enabled Notifications</span>
                <span
                  className={`${
                    enabled
                      ? "translate-x-6 bg-secondary-900"
                      : "translate-x-1 bg-gray-500"
                  } inline-block h-4 w-4 transform rounded-full transition`}
                ></span>
              </Switch>
            </div>
          </div>
          <hr className="my-8 border-gray-500/30 border-dashed" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/2048px-Slack_icon_2019.svg.png"
                className="w-8 h-8 object-cover"
              />
              <div className="flex flex-col gap-y-1">
                <h5 className="text-gray-100">Slack</h5>
                <p className="text-gray-500 text-sm">
                  Integrate Projects Disscusions
                </p>
              </div>
            </div>
            <div>
              <Switch
                checked={enabled}
                onChange={setEnabled}
                className={`${
                  enabled ? "bg-primary" : "bg-secondary-900"
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span className="sr-only">Enabled Notifications</span>
                <span
                  className={`${
                    enabled
                      ? "translate-x-6 bg-secondary-900"
                      : "translate-x-1 bg-gray-500"
                  } inline-block h-4 w-4 transform rounded-full transition`}
                ></span>
              </Switch>
            </div>
          </div>
          <hr className="my-8 border-gray-500/30 border-dashed" />
        </form>
      </div>

      {/* Email Preferences */}
      <div className="bg-secondary-100 p-8 rounded-xl mb-8">
        <h1 className="text-xl text-gray-100">
          Notificaciones por Correo Electrónico
        </h1>
        <hr className="my-8 border-gray-500/30" />
        <form className="mb-8">
          <div className="flex items-center gap-4">
            <input type="checkbox" className="accent-primary" id="id1" />
            <div className="flex flex-col gap-y-1">
              <label htmlFor="id1" className="text-gray-100">
                Successful Payments
              </label>
              <p className="text-gray-500 text-sm">
                Receive a notification for every Successful payment.
              </p>
            </div>
          </div>
          <hr className="my-8 border-gray-500/30 border-dashed" />
          <div className="flex items-center gap-4">
            <input type="checkbox" className="accent-primary" id="id2" />
            <div className="flex flex-col gap-y-1">
              <label htmlFor="id2" className="text-gray-100">
                Payouts
              </label>
              <p className="text-gray-500 text-sm">
                Receive a notification for every initiated payment.
              </p>
            </div>
          </div>
          <hr className="my-8 border-gray-500/30 border-dashed" />
          <div className="flex items-center gap-4">
            <input type="checkbox" className="accent-primary" id="id3" />
            <div className="flex flex-col gap-y-1">
              <label htmlFor="id3" className="text-gray-100">
                Customer Payment Dispute
              </label>
              <p className="text-gray-500 text-sm">
                Receive a notification if a payment is disputed by a customer
                and for dispute purposes.
              </p>
            </div>
          </div>
        </form>
        <hr className="my-8 border-gray-500/30" />
        <div className="flex justify-end">
          <button
            className="bg-primary/80 text-black py-2 px-4 rounded-lg hover:bg-primary
            transition-colors"
          >
            Guardar
          </button>
        </div>
      </div>

      {/* Inactive Account */}
      <div className="bg-secondary-100 p-8 rounded-xl mb-8">
        <h1 className="text-xl text-gray-100">Desactivar Cuenta</h1>
        <hr className="my-8 border-gray-500/30" />
        <div
          className="flex flex-col md:flex-row items-center gap-4 bg-yellow-600/10 p-4 rounded-lg border 
            border-dashed border-yellow-600 mb-8"
        >
          <div className="flex justify-center">
            <RiErrorWarningLine className="text-5xl text-yellow-600" />
          </div>
          <div className="flex-1">
            <h5 className="text-gray-100 text-xl mb-2">
              You Are Deactivating Your Account
            </h5>
            <p className="text-gray-500">
              For extra security, this requires you to confirm your email or
              phone number when you reset yousignr password.{" "}
              <Link className="text-blue-500">Learn More</Link>
            </p>
          </div>
        </div>
        <form className="flex items-center gap-4">
          <input type="checkbox" className="accent-primary" id="idInactive" />
          <label htmlFor="idInactive" className="text-gray-500">
            I confirm my account dectivation
          </label>
        </form>
        <hr className="my-8 border-gray-500/30" />
        <div className="flex justify-end">
          <button
            className="bg-red-500/80 text-gray-100 py-2 px-4 rounded-lg hover:bg-red-500
            transition-colors"
          >
            Desactivate Account
          </button>
        </div>
      </div>
    </>
  );
};

export default Perfil;
