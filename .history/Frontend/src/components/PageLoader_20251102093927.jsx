import { LoaderICons } from "lucide-react";

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoaderIIcon className="w-16 h-16 text-blue-600 animate-spin" />
    </div>
  );
}

export default PageLoader;
