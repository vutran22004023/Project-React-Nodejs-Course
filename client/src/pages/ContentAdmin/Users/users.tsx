import { DataTableDemo } from './tableUser';
// import ButtonComponent from '@/components/ButtonComponent/Button';
import NewUsers from './newUser';
import { UserService } from '@/services';
import { useCombinedData } from '@/hooks/index';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export type IfetchDataTable = {
  dataUsers: any;
  err: any;
  isLoading: any;
};

export default function Users() {
  const user = useSelector((state: RootState) => state.user);
  const getAllUsers = async () => {
    const res = await UserService.GetAllUsers(user.access_Token);
    return res;
  };

  const fetchTableData = useCombinedData('dataAllUserss', getAllUsers);
  const {
    data: dataAllUsers,
    error: Errdata,
    isLoading: isLoadingAllUsers,
    refetch,
  } = fetchTableData;
  
  return (
    <div className='container mt-9 w-full'>
      <div className='mb-3 flex justify-between'>
        <h3 className='cactus-classical-serif-md text-[25px] '>Người dùng</h3>
        <NewUsers
          fetchTableData={{
            data: dataAllUsers,
            error: Errdata,
            isLoading: isLoadingAllUsers,
            refetch,
          }}
        />
      </div>
      <div>
        <DataTableDemo
          fetchTableData={{
            data: dataAllUsers,
            error: Errdata,
            isLoading: isLoadingAllUsers,
            refetch,
          }}
        />
      </div>
    </div>
  );
}
