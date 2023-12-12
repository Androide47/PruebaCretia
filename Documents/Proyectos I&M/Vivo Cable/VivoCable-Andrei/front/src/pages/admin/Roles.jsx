import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    RiDraftFill,
} from "react-icons/ri";
import { Tab } from "@headlessui/react";

const Roles = () => {

    return (
        <div>
                  {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-y-4 mb-10">
        <div>
          <h1 className="font-bold text-gray-100 text-xl">Roles</h1>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>-</span>
            <span>Roles</span>
          </div>
        </div>
      </div>
      <Tab.Group>
        <Tab.Panels className="mt-8">
          <Tab.Panel>
            <div className="bg-secondary-100 p-8 rounded-lg">
            <h1 className="text-3xl mb-8">Resultados</h1>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            No° Rol
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Rol
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Comentario
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Comentario
                        </th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
        </div>
    )
}

export default Roles