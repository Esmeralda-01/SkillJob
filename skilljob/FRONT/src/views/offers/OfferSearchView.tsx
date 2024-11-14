import { useState, useEffect, Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { searchOffers } from "@/api/OfferAPI";
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { Offer } from "@/types/index";
import { toast } from "react-toastify";
import { requestService } from "@/api/SolicitudAPI";

const OfferSearchView = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredOffers, setFilteredOffers] = useState<Offer[]>([]); // Estado para las ofertas filtradas
  const [allOffers, setAllOffers] = useState<Offer[]>([]); // Estado para todas las ofertas

  // Usamos useLocation para acceder al searchTerm pasado a través de queryParams
  const location = useLocation();

  // Obtén el searchTerm de los queryParams (si existe)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get("searchTerm");
    if (searchParam) {
      setSearchTerm(searchParam);
    }
  }, [location]);

  // Usamos useMutation para realizar la búsqueda de ofertas
  const { mutate, data, isError } = useMutation({
    mutationFn: searchOffers,
    onSuccess: (result) => {
      // Almacenar las ofertas filtradas
      setFilteredOffers(result);
      // Almacenar todas las ofertas para poder mostrarlas junto con los resultados de búsqueda
      setAllOffers(result); // Aquí guardamos todas las ofertas obtenidas de la búsqueda
      toast.success(`Resultados para: "${searchTerm}"`);
    },
    onError: (error) => {
      toast.error(`Error al realizar la búsqueda: ${error.message}`);
    }
  });
  // Crear la mutación para enviar una solicitud de servicio
  const { mutate: createRequest } = useMutation({
    mutationFn: requestService,
    onError: (error) => {
      toast.error(error.message)
      console.log(error.message)
    },
    onSuccess: () => {
      toast.success("Solicitud creada exitosamente. Revisa tus solicitudes.");
    },

  });

  // Manejar clic en "Solicitar servicio"
  const handleRequestService = (offerId: string) => {
    createRequest(offerId);
  };

  // Realizar la búsqueda de ofertas cuando el searchTerm cambie
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      toast.warn("Por favor ingrese un término de búsqueda");
      return;
    }
    mutate(searchTerm); // Ejecuta la mutación de búsqueda cuando el término de búsqueda cambia
  };

  // Si hay un error al cargar las ofertas
  if (isError) return <p>Error al cargar las ofertas</p>;

  return (
    <>
      <h1 className="text-5xl font-black">Resultados de búsqueda</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">Aquí están los resultados</p>

      <div className="flex justify-center">
        <div className="flex items-center space-x-4 mt-5 mb-3">
          <input
            type="text"
            placeholder="Buscar ofertas..."
            className="w-full p-3 border border-gray-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white font-bold"
            onClick={handleSearch}
          >
            Buscar
          </button>
        </div>
      </div>

      {/* Mostrar mensaje de no encontrar ofertas */}
      {filteredOffers.length === 0 && searchTerm && (
        <p className="text-center py-5">No se encontraron ofertas con el término "{searchTerm}"</p>
      )}

      {/* Mostrar todas las ofertas junto con las filtradas */}
      <ul role="list" className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg">
        {allOffers.length ? (
          allOffers.map((offer: Offer) => (
            <li key={offer._id} className="flex justify-between gap-x-6 px-5 py-10">
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto space-y-2">
                  <p className="text-gray-600 text-3xl font-bold">{offer.projectName}</p>
                  <p className="text-sm text-gray-400">Cliente: {offer.clientName}</p>
                  <p className="text-sm text-gray-400">{offer.description}</p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-x-6">
                <Menu as="div" className="relative flex-none">
                  <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                    <span className="sr-only">opciones</span>
                    <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                  </Menu.Button>
                  <Transition as={Fragment} enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95">
                    <Menu.Items
                      className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                    >
                      <Menu.Item>
                        <button
                          className='block px-3 py-1 text-sm leading-6 text-gray-900'
                          onClick={() => handleRequestService(offer._id)}
                        >
                          Solicitar servicio
                        </button>
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </li>
          ))
        ) : (
          <p className="text-center py-5">Cargando ofertas...</p>
        )}
      </ul>
    </>
  );
};

export default OfferSearchView;
