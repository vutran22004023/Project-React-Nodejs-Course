import { ReactNode }  from 'react'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
  } from "@/components/ui/dialog"

  interface UserDialogProps {
    triggerContent: ReactNode;
    contentHeader: ReactNode;
    contentBody: ReactNode;
    contentFooter: ReactNode;
  }
export default function Modal({ triggerContent, contentHeader, contentBody, contentFooter }: UserDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {triggerContent}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[355px] md:max-w-[550px] bg-slate-50 " style={{borderRadius:'10px'}}>
        <DialogHeader>
          {contentHeader}
        </DialogHeader>
        {contentBody}
        <DialogFooter>
          {contentFooter}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
