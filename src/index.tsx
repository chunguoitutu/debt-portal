import {createRoot} from 'react-dom/client'

// Axios
import {Chart, registerables} from 'chart.js'
// Apps
import './_metronic/assets/sass/style.react.scss'
import './_metronic/assets/fonticon/fonticon.css'
import './_metronic/assets/keenicons/duotone/style.css'
import './_metronic/assets/keenicons/outline/style.css'
import './_metronic/assets/keenicons/solid/style.css'
/**
 * TIP: Replace this style import with rtl styles to enable rtl mode
 *
 * import './_metronic/assets/css/style.rtl.css'
 **/
import './_metronic/assets/sass/style.scss'
import './_metronic/assets/sass/plugins.scss'

// Tippy styles
import 'tippy.js/dist/tippy.css'

// My styles
import './app/sass/style.scss'

import {AppRoutes} from './routing/AppRoutes'
import {PrimeReactProvider} from 'primereact/api'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import {AuthProvider} from './app/context/AuthContext'
import {SocketProvider} from './app/context/SocketContext'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {ShareProvider} from './app/context/SharedContext'
/**
 * Creates `axios-mock-adapter` instance for provided `axios` instance, add
 * basic Metronic mocks and returns it.
 *
 * @see https://github.com/ctimmerm/axios-mock-adapter
 */
/**
 * Inject Metronic interceptors for axios.
 *
 * @see https://github.com/axios/axios#interceptors
 */
Chart.register(...registerables)

const container = document.getElementById('root')
if (container) {
  createRoot(container).render(
    <AuthProvider>
      <ShareProvider>
        <SocketProvider>
          <PrimeReactProvider>
            <DndProvider backend={HTML5Backend}>
              <AppRoutes />
            </DndProvider>
          </PrimeReactProvider>
        </SocketProvider>
      </ShareProvider>
    </AuthProvider>
  )
}
