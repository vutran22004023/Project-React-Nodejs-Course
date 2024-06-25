import { useEffect } from 'react';
// import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import ButtonComponent from '@/components/ButtonComponent/Button';
import { UserService } from '@/services/index';
import { useMutationHook } from '@/hooks/index';
import { success, error } from '@/components/MessageComponents/Message';
// import { message } from 'antd';
import { useCombinedData } from '@/hooks/index';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface DeleteProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function DeleteUser({ id, isOpen, onClose }: DeleteProps) {
  const user = useSelector((state: RootState) => state.user);

  const getAllUsers = async () => {
    const res = await UserService.GetAllUsers(user.access_Token);
    return res;
  };
  
  const fetchTableData = useCombinedData('dataAllUserss', getAllUsers);
  const {
    // data: _dataAllUsers,
    // error: _Errdata,
    // isLoading: _isLoadingAllUsers,
    refetch,
  } = fetchTableData;

  const mutationDeleteUsers = useMutationHook(async (idDelete: string) => {
    const res = await UserService.DeleteUser(idDelete, user.access_Token);
    return res;
  });

  const { data: dataDeleteUsers } = mutationDeleteUsers;

  useEffect(() => {
    if (dataDeleteUsers?.status === 200) {
      success(`${dataDeleteUsers?.message}`);
    } else if (dataDeleteUsers?.status === 'ERR') {
      error(`${dataDeleteUsers?.message}`);
    }
  }, [dataDeleteUsers]);

  const handleButtonDelete = () => {
    mutationDeleteUsers.mutate(id);
    onClose();
    refetch();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className='sm:max-w-[425px] bg-[#fff]'>
        <DialogHeader>
          <DialogTitle>Bạn có chắc chắn xóa người dùng ...</DialogTitle>
          <DialogDescription>
            Bạn phải chắc chắn rằng bạn sẽ xóa người dùng này, nếu xóa thì dữ
            liệu mất vĩnh viễn.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <ButtonComponent type='submit' onClick={handleButtonDelete}>
            Xóa người dùng
          </ButtonComponent>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
