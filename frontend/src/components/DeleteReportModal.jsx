import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";

function DeleteReportModal({ isOpen, onClose, onConfirm, loading }) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete Water Report</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this report? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2 sm:gap-0">
                    <Button variant="outline" onClick={onClose} disabled={loading}>
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        className="bg-red-600 hover:bg-red-700 text-white"
                        onClick={onConfirm}
                        disabled={loading}
                    >
                        {loading ? <Spinner className="mr-2 h-4 w-4" /> : null}
                        {loading ? "Deleting..." : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default DeleteReportModal;
