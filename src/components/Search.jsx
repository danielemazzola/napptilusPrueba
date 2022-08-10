import { Fragment } from 'react'
import useClient from '../hooks/useClient'

const Search = () => {
  const { search, setSearch } = useClient()
  return (
    <Fragment>
      <input
        className="rounded-sm px-1 shadow-lg py-2"
        placeholder="Buscador"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </Fragment>
  )
}

export default Search
