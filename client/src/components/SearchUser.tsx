/* eslint-disable react/react-in-jsx-scope */
import { memo, useId, useRef } from "react";
import type { filterTypes } from "../types";

interface SearchUserProps {
  onTextToFilter: (text: string) => void;
  onSearch: (filters: filterTypes) => void;
}

export const SearchUsers = memo(function SearchUser({
  onTextToFilter,
  onSearch,
}: SearchUserProps) {
  const searchUserForm = useId();
  const labelGender = useId();
  const labelRole = useId();
  const idRole = useId();
  const idGender = useId();
  const timeoutId = useRef<number>(0);
  const idInput = useId();

  const handleSearchUser = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    //REVISAR
    const formData = new FormData(e.currentTarget);

    const filter = {
      role: formData.get(idRole),
      gender: formData.get(idGender),
    };

    onSearch(filter);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;

    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    timeoutId.current = setTimeout(() => {
      onTextToFilter(search);
    }, 1000);
  };

  return (
    <>
      <section className='users-search'>
        <form action='submit' onChange={handleSearchUser} name={searchUserForm}>
          <div className='search-bar'>
            <input
              type='text'
              name={idInput}
              placeholder='Emily, Oliva...'
              onChange={handleChangeInput}
            />
            <button type='submit'>Search</button>
          </div>
          <div className='search-filters'>
            <label htmlFor={labelGender}>Gender </label>
            <select name={idGender} id={idGender}>
              <option value=''>All</option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
            </select>
            <label htmlFor={labelRole}>Role</label>
            <select name={idRole} id={idRole}>
              <option value=''>All</option>
              <option value='moderator'>Moderator</option>
              <option value='admin'>Admin</option>
            </select>
          </div>
        </form>
      </section>
    </>
  );
});
