import { useLocation } from "react-router-dom";
import { useInfo } from "../Hooks/useInfo";
import { PageLayout } from "../PageLayout";
import { InfoComponent } from "../Components/InfoComponent";
import { LoadingCompInfo } from "../Components/LoadingCompInfo";

export const InfoPage = () => {
  const { pathname } = useLocation();

  const { details, isLoading, error } = useInfo(pathname);

  return (
    <PageLayout>
      {isLoading ? (
        <div className="flex h-full w-full items-center justify-center">
          <LoadingCompInfo />
        </div>
      ) : error ? (
        <div className="flex h-full w-full items-center justify-center">
          <p>{error}</p>
        </div>
      ) : (
        <InfoComponent details={details} />
      )}
    </PageLayout>
  );
};
