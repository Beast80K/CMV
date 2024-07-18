'use client'
import { useEffect } from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SWRConfig } from 'swr'
import { ZustandStore } from '@/app/store/store';
import { Toaster } from 'sonner';
import { useShallow } from 'zustand/react/shallow';
import ScrollToSection from '@/app/utils/Scroll/ScrollToSection';


const Providers = ({ children }) => {

	const { StoreTheme } = ZustandStore(useShallow((state) => state))

	useEffect(() => {
		ZustandStore.persist.rehydrate()
		ScrollToSection()
		// SCROLL TO SECTION AFTER 1ST LOAD
	}, [])

	return (
		<NextUIProvider >
			<NextThemesProvider
				attribute="class"
				themes={['light', 'dark', 'amoled', 'system']}
				enableSystem={true}
				enableColorScheme={true}
			>
				<SWRConfig value={{ provider: () => new Map() }}>


					{children}

					<Toaster
						position='bottom-center'
						theme={StoreTheme}
						visibleToasts={3}
						gap={10}
						duration={3000}
						pauseWhenPageIsHidden={true}
						richColors={true}
					/>


				</SWRConfig>
			</NextThemesProvider>
		</NextUIProvider>
	)
}

export default Providers