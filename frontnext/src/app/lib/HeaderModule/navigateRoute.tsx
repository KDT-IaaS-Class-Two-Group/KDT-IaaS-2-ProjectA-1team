// @/src/app/lib/header/useRoute.ts
import { useRouter } from 'next/router';

type NavigateFunction = (route: string) => void;

export const useRoute = (): NavigateFunction => {
  const router = useRouter();

  const navigate = (route: string) => {
    router.push(route);
  };

  return navigate;
};
