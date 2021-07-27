import { Link, Navigate, Route, Routes } from 'react-router-dom'
import { BoardScreen } from 'screens/board'
import { EpicScreen } from 'screens/epic'

export const ProjectScreen = () => {
  return (
    <div>
      <Link to={'board'}>看板</Link>
      <Link to={'epic'}>任务组</Link>
      <Routes>
        <Route path={'/board'} element={<BoardScreen />}></Route>
        <Route path={'/epic'} element={<EpicScreen />}></Route>
        <Navigate to={`${window.location.pathname}/board`} />
      </Routes>
    </div>
  )
}
