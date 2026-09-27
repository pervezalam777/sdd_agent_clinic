import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    // will be populated with slices as features are added
  },
  devTools: true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
