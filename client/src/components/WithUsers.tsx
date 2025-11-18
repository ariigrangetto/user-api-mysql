/* eslint-disable react/react-in-jsx-scope */
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import type { USERS } from "../types.d";

interface WithUsersProps {
  users: USERS[];
  onDeleteUser: (id: string | number) => void;
  onSortUsersName: () => void;
  onSortUsersAge: () => void;
}
export default function WithUsers({
  users,
  onDeleteUser,
  onSortUsersName,
  onSortUsersAge,
}: WithUsersProps) {
  return (
    <>
      <TableContainer component={Paper} className='table'>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>
                <button onClick={onSortUsersName}>Name</button>
              </TableCell>
              <TableCell onClick={onSortUsersAge}>Age</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <img src={user.image} alt={user.firstName} />
                </TableCell>

                <TableCell>
                  {user.firstName} {user.maidenName} {user.lastName}
                </TableCell>

                <TableCell>{user.age}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <button
                    className='delete-btn'
                    onClick={() => onDeleteUser(user.id)}
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
