import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import SetInitialTheme from '../utils/Theme/SetInitialTheme'
import { toast } from 'sonner'



const InitialState = {
	StoreHydrated: false,
	StoreRowDblClickMsg: true,
	StoreCurrency: "usd",
	StoreLocale: "en",
	StoreTheme: SetInitialTheme(),
	StorePrivacyPolicyShown: false,
	StoreWatchlistCoins: [],
}



export const ZustandStore = create(

	persist(
		(set, get) => ({


			StoreHydrated: false,
			SetStoreHydrated: (state) => {
				set({
					StoreHydrated: state
				});
			},
			StoreRowDblClickMsg: true,
			SetStoreRowDblClickMsg: (Show) => {
				set({
					StoreRowDblClickMsg: Show || false
				});
			},

			StoreCurrency: "usd",
			SetStoreCurrency: (Currency) => {
				try {
					set({ StoreCurrency: Currency })
				} catch (e) {
					toast.error(e.toString())
				}
			},

			StoreLocale: "en",
			SetStoreLocale: (Lang) => {
				try {
					set({ StoreLocale: Lang })
				} catch (e) {
					toast.error(e.toString())
				}
			},

			StoreTheme: SetInitialTheme(),
			SetStoreTheme: (Theme) => {
				try {
					set({ StoreTheme: Theme })
				} catch (e) {
					toast.error(e.toString())
				}
			},


			StorePrivacyPolicyShown: false,
			SetPrivacyPolicyShown: (Shown) => {
				try {
					set({ StorePrivacyPolicyShown: Shown })
				} catch (e) {
					toast.error(e.toString())
				}
			},

			StoreWatchlistCoins: [],

			AddCoinToWatchlist: (Item) => {
				try {
					set((state) => ({
						StoreWatchlistCoins: [...state.StoreWatchlistCoins, Item],

					}))

				} catch (e) {
					toast.error(e.toString())
				}
			},



			RemoveCoinFromWatchlist: (Id) => {
				try {
					set((state) => ({
						StoreWatchlistCoins: [...state.StoreWatchlistCoins.filter(f => f.id !== Id)],
					}))
				} catch (e) {
					toast.error(e.toString())
				}
			},


			SetWatchListCoins: (Arr) => {
				try {
					set((state) => ({
						StoreWatchlistCoins: [...Arr],
					}))
				} catch (e) {
					toast.error(e.toString())
				}
			},

			ClearWatchlist: () => {
				try {
					set((state) => ({
						StoreWatchlistCoins: [],
					}))
				} catch (e) {
					toast.error(e.toString())
				}
			},

			ResetStore: (NewState) => {
				set(NewState ? NewState : InitialState);
			}


		}),
		{
			name: 'CMV',
			storage: createJSONStorage(() => localStorage),
			skipHydration: true,
			partialize: (state) => Object.fromEntries(
				Object.entries(state).filter(([key]) => !['StoreHydrated'].includes(key)),
			),
			// KEY THAT YOU GIVE OVER HERE WILL BE STORED, I HAVE SKIPPED StoreHydrated KEY
			onRehydrateStorage: (state) => {

				try {

					return (state, error) => {
						if (error) {
							state.SetStoreCurrency('usd')
							state.SetStoreLocale('en')
							state.SetPrivacyPolicyShown(false)
							state.SetWatchListCoins([])
							state.SetStoreTheme(SetInitialTheme())
							state.SetStoreHydrated(true)
							toast.success("Settings were reset, to recover from error !")

						} else {
							state.SetStoreHydrated(true)
							state.SetStoreTheme(SetInitialTheme())
						}
					}
				} catch (e) {
					state.ResetStore({ ...InitialState, StoreHydrated: true })

				}
			},
		}
	)

)