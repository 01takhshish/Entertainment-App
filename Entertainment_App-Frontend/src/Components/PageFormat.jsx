/* eslint-disable react/prop-types */
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

export const PageFormat = ({
  totalPages,
  setCurrentPage,
  currentPage,
  givenPadding,
}) => {
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <div
            className={`cursor-pointer rounded-lg bg-app-icons ${
              currentPage === i ? "bg-opacity-100" : "bg-opacity-40"
            } p-2 backdrop-blur-md sm:px-3 lg:px-4`}
            onClick={() => handlePageChange(i)}
            key={i}
          >
            <span className={"font-semibold"}>{i}</span>
          </div>
        );
      }
    } else {
      if (currentPage <= 2) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(
            <div
              className={`cursor-pointer rounded-lg bg-app-icons ${
                currentPage === i ? "bg-opacity-100" : "bg-opacity-40"
              } p-2 backdrop-blur-md sm:px-3 lg:px-4`}
              onClick={() => handlePageChange(i)}
              key={i}
            >
              <span className={"font-semibold"}>{i}</span>
            </div>
          );
        }
        pageNumbers.push(
          <div
            onClick={() => handlePageChange(totalPages)}
            className={`cursor-pointer rounded-lg bg-app-icons ${
              currentPage === totalPages ? "bg-opacity-100" : "bg-opacity-40"
            } p-2 backdrop-blur-md sm:px-3 lg:px-4`}
            key={totalPages}
          >
            <span className="font-semibold">{totalPages}</span>
          </div>
        );
      } else if (currentPage >= totalPages - 1) {
        pageNumbers.push(
          <div
            onClick={() => handlePageChange(1)}
            className={`cursor-pointer rounded-lg bg-app-icons ${
              currentPage === 1 ? "bg-opacity-100" : "bg-opacity-40"
            } p-2 backdrop-blur-md sm:px-3 lg:px-4`}
            key={1}
          >
            <span className="font-semibold">{1}</span>
          </div>
        );

        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(
            <div key={i}>
              <div
                className={`cursor-pointer rounded-lg bg-app-icons ${
                  currentPage === i ? "bg-opacity-100" : "bg-opacity-40"
                } ${givenPadding} backdrop-blur-md sm:px-3 lg:px-4`}
                onClick={() => handlePageChange(i)}
              >
                <span className={"font-semibold"}>{i}</span>
              </div>
            </div>
          );
        }
      } else {
        pageNumbers.push(
          <div
            onClick={() => handlePageChange(1)}
            className={`cursor-pointer rounded-lg bg-app-icons ${
              currentPage === 1 ? "bg-opacity-100" : "bg-opacity-40"
            } p-2 backdrop-blur-md sm:px-3 lg:px-4`}
            key={1}
          >
            <span className="font-semibold">{1}</span>
          </div>
        );

        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(
            <div key={i}>
              <div
                className={`cursor-pointer rounded-lg bg-app-icons ${
                  currentPage === i ? "bg-opacity-100" : "bg-opacity-40"
                } ${givenPadding} backdrop-blur-md sm:px-3 lg:px-4`}
                onClick={() => handlePageChange(i)}
              >
                <span className={"font-semibold"}>{i}</span>
              </div>
            </div>
          );
        }

        pageNumbers.push(
          <div
            onClick={() => handlePageChange(totalPages)}
            className={`cursor-pointer rounded-lg bg-app-icons ${
              currentPage === totalPages ? "bg-opacity-100" : "bg-opacity-40"
            } ${givenPadding} backdrop-blur-md sm:px-3 lg:px-4`}
            key={totalPages}
          >
            <span className="font-semibold">{totalPages}</span>
          </div>
        );
      }
    }

    return pageNumbers;
  };

  return (
    <div className="flex w-full items-center justify-between gap-2 sm:gap-3">
      <div
        className={`cursor-pointer rounded-lg bg-app-icons bg-opacity-40 ${givenPadding} backdrop-blur-md`}
        onClick={() => {
          handlePageChange(currentPage !== 1 ? currentPage - 1 : currentPage);
        }}
      >
        <MdOutlineArrowBackIosNew className="size-4 md:size-6" />
      </div>
      {renderPageNumbers()}
      <div
        className={`cursor-pointer rounded-lg bg-app-icons bg-opacity-40 ${givenPadding} backdrop-blur-md`}
        onClick={() => {
          handlePageChange(
            currentPage !== totalPages ? currentPage + 1 : currentPage
          );
        }}
      >
        <MdOutlineArrowForwardIos className="size-4 md:size-6" />
      </div>
    </div>
  );
};
