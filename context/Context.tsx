import { DataType } from "components/ui/Select";
import * as SecureStore from "expo-secure-store";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { Card } from "type";

const SECURE_KEY = "auth";

export type FilterType = {
  name?: string;
  type?: DataType;
  set?: DataType;
  rarity?: DataType;
};
interface AppContextInterface {
  isLoading?: boolean;
  token?: string | null;
  // filter?: FilterType;
  cardList?: Card[];
  addCard?: (card: Card) => void;
  removeAllCard?: () => void;
  updateQty?: (id: string, qty: number) => void;
  removeACard?: (id: string) => void;
}

const initialState = {
  isLoading: false,
  token: null,
  filter: {
    name: null,
    type: null,
    set: null,
    rarity: null,
  },
  cardList: [],
};
type Action =
  | {
      type: "LOGIN";
      payload: AppContextInterface;
    }
  | {
      type: "RESTORE_TOKEN";
      payload: string;
    }
  // | {
  //     type: "FILTER";
  //     payload: FilterType;
  //   }
  | {
      type: "ADD_CARD";
      payload: Card;
    }
  | {
      type: "UPDATE_QTY";
      payload: { id: string; qty: number };
    }
  | {
      type: "REMOVE_ALL_CARD";
    }
  | {
      type: "REMOVE_A_CARD";
      payload: string;
    };

const AppContext = createContext<AppContextInterface>(initialState);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken: string;

      try {
        userToken = await SecureStore.getItemAsync(SECURE_KEY);
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: "RESTORE_TOKEN", payload: userToken });
    };

    bootstrapAsync();
  }, []);

  const login = useCallback(async (payload: AppContextInterface) => {
    return new Promise(async (resolve, reject) => {
      try {
        await SecureStore.setItemAsync(SECURE_KEY, JSON.stringify(payload));
        dispatch({ type: "LOGIN", payload });
        resolve("Successfully signup.");
      } catch (e) {
        reject("fail to sign in.");
      }
    });
  }, []);

  // const applyFilterListing = useCallback(async (filter: FilterType) => {
  //   let payload = { ...filter };
  //   dispatch({ type: "FILTER", payload });
  // }, []);

  const addCard = useCallback(
    (card: Card) => {
      if (!state.cardList.some((c) => c.id === card?.id)) {
        dispatch({ type: "ADD_CARD", payload: card });
      }
    },
    [state]
  );

  const updateQty = useCallback((id: string, qty: number) => {
    dispatch({ type: "UPDATE_QTY", payload: { id, qty } });
  }, []);

  const removeAllCard = useCallback(() => {
    dispatch({ type: "REMOVE_ALL_CARD" });
  }, []);

  const removeACard = useCallback((id: string) => {
    dispatch({ type: "REMOVE_A_CARD", payload: id });
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      login,
      addCard,
      updateQty,
      removeAllCard,
      removeACard,
      // applyFilterListing,
    }),
    [state, login, addCard, updateQty, removeAllCard, removeACard]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const reducer = (state: AppContextInterface, action: Action) => {
  switch (action.type) {
    case "RESTORE_TOKEN":
      return {
        ...state,
        token: action.payload,
        isLoading: false,
      };
    case "LOGIN":
      return {
        ...state,
        ...action.payload,
      };
    // case "FILTER":
    //   return {
    //     ...state,
    //     filter: action?.payload,
    //   };
    case "ADD_CARD":
      return {
        ...state,
        cardList: [...state.cardList, { ...action.payload, qty: 1 }],
      };
    case "REMOVE_ALL_CARD":
      return {
        ...state,
        cardList: [],
      };
    case "REMOVE_A_CARD":
      return {
        ...state,
        cardList: state.cardList?.filter((c) => c.id !== action.payload),
      };
    case "UPDATE_QTY":
      const { id, qty } = action.payload;
      return {
        ...state,
        cardList: state.cardList?.map((card) => {
          if (card?.id === id) {
            card.qty = card.qty + qty;
          }
          return card;
        }),
      };
  }
};

export const useAppState = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Error");
  }
  return context;
};
