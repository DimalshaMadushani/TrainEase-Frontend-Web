import React from 'react'
import SearchBar from '../components/SearchBar'

const stations = [
    { label: 'Beliatta' },
    { label: 'Tangalle' },
    { label: 'Matara' },
    { label: 'Galle' },
    { label: 'Kalutara' },
    { label: 'Colombo Fort' },
    { label: 'Negombo' },
    { label: 'Chilaw' },]

    const handleSearch = () => {
        // Implement search functionality here
        console.log("Search clicked");
      };
    
export default function Home() {
  return (
    <div>
        <SearchBar stations={stations} onSearch={handleSearch}/>
      Home
    </div>
  )
}
