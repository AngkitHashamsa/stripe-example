import React from "react";

const SubcritpionDesign = ({ setSubscriber }) => {
  // console.log(setSubscriber);
  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center">
      <div
        className="rounded-lg shadow-lg bg-white p-6 w-72 group hover:shadow-2xl"
        onClick={() => setSubscriber(true)}
      >
        <p className="text-lg text-gray-800 font-semibold">
          {" "}
          Managed Kubernetes{" "}
        </p>

        <p className="text-gray-600 font-light mt-5"> Starts At </p>

        <div className="flex flex-row mt-3 gap-2 place-items-end">
          <p className="text-6xl font-bold"> $10 </p>
          <p className="text-2xl font-light items-bottom pb-1"> /mo </p>
        </div>

        <div className="flex flex-col gap-2 mt-5">
          <div className="grid grid-cols-12">
            <div className="col-span-2"></div>
            <div className="col-span-10">
              <p className="text-gray-500"> Simple, managed Kubernetes </p>
            </div>
          </div>

          <div className="grid grid-cols-12">
            <div className="col-span-2"></div>
            <div className="col-span-10">
              <p className="text-gray-500"> Free control plane included </p>
            </div>
          </div>

          <div className="grid grid-cols-12">
            <div className="col-span-2"></div>
            <div className="col-span-10">
              <p className="text-gray-500">
                {" "}
                Scale automatically, increase availability{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubcritpionDesign;
