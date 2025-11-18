/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import "./App.css";
import type { USERS, filterTypes } from "./types";
import useService from "./hooks/useService";
import { useQueryClient } from "@tanstack/react-query";
import { SearchUsers } from "./components/SearchUser";
import WithUsers from "./components/WithUsers.jsx";
import WithoutUsers from "./components/WithoutUsers.js";

function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [textToFilter, setTextToFilter] = useState<string>("");
  const [sortByName, setSortByName] = useState<boolean>(false);
  const [sortByAge, setSortByAge] = useState<boolean>(false);
  const { isLoading, isError, data: users } = useService();
  const [filters, setFilters] = useState<filterTypes>({
    role: "",
    gender: "",
  });
  const RESULTS_PER_PAGE = 4;
  const queryClient = useQueryClient();

  const filteredByFilters = users?.filter((user) => {
    return (
      (filters.gender === "" || user.gender === filters.gender) &&
      (filters.role === "" || user.role === filters.role)
    );
  });

  const filteredByText = filteredByFilters?.filter(
    (user) =>
      user.firstName.toLowerCase().includes(textToFilter.toLocaleLowerCase()) ||
      user.lastName.toLowerCase().includes(textToFilter.toLocaleLowerCase())
  );

  const handleSearch = (filters: filterTypes) => {
    setFilters(filters);
    setCurrentPage(1);
  };

  function handleDeleteUser(id: number | string) {
    queryClient.setQueryData<USERS[]>(["users"], (oldData) =>
      oldData ? oldData.filter((old) => old.id !== id) : oldData
    );
    setCurrentPage(1);
  }

  const handleFilterByText = (text: string) => {
    setTextToFilter(text);
    setCurrentPage(1);
  };

  const handleSortByUserName = () => {
    setSortByName((prev) => !prev);
  };

  const handleSortByAge = () => {
    setSortByAge((prev) => !prev);
  };

  const sortedUsersByName = sortByName
    ? [...filteredByText].sort((a, b) => a.firstName.localeCompare(b.firstName))
    : filteredByText;

  const sortedUsersByAge = sortByAge
    ? [...sortedUsersByName].sort((a, b) => a.age - b.age)
    : sortedUsersByName;

  const totalPages = Math.ceil(sortedUsersByAge?.length / RESULTS_PER_PAGE);
  const resultsPerPage = sortedUsersByAge?.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  );

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const isLastPage = currentPage === totalPages;
  const isFirstPage = currentPage === 1;

  const stylePrevBtn = isFirstPage ? "disableBtn" : "";
  const styleNextBtn = isLastPage ? "disableBtn" : "";

  const handlePrevPage = () => {
    if (!isFirstPage) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (!isLastPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <>
      <header></header>
      <main>
        <h1>Users lists:</h1>
        <SearchUsers
          onTextToFilter={handleFilterByText}
          onSearch={handleSearch}
        />
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error</p>}
        <section className='users-lists'>
          {resultsPerPage?.length > 0 ? (
            <>
              <WithUsers
                users={resultsPerPage}
                onDeleteUser={handleDeleteUser}
                onSortUsersName={handleSortByUserName}
                onSortUsersAge={handleSortByAge}
              />
              <button onClick={handlePrevPage} className={stylePrevBtn}>
                prev
              </button>
              {pages.map((_, index) => (
                <>
                  <button
                    onClick={() => setCurrentPage(index + 1)}
                    className={currentPage === index + 1 ? "isActive" : ""}
                    key={index}
                  >
                    {index + 1}
                  </button>
                </>
              ))}
              <button onClick={handleNextPage} className={styleNextBtn}>
                next
              </button>
            </>
          ) : (
            <WithoutUsers />
          )}
        </section>
      </main>
    </>
  );
}

export default App;
