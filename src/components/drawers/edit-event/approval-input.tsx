// imports
import { Card, CardBody, Switch } from "@heroui/react";
import { useFormContext } from "react-hook-form";
// schemas
import { EditEventValues } from "@/common/schemas/edit-event.schema";
// icon components
import { AccessiblityIcon } from "@/components/icons";

const ApprovalInput = () => {
  // hooks
  const { watch, setValue } = useFormContext<EditEventValues>();

  // derived state
  const requiresApproval = watch("details.requiresApproval");

  return (
    <div className="w-full h-auto">
      <Card
        shadow="none"
        className="w-full border border-neutral-200 dark:border-[#343A40]"
      >
        <CardBody className="grid grid-cols-12 items-start gap-2">
          {/* icon */}
          <div className="col-span-1 p-1 flex items-center justify-center">
            <AccessiblityIcon size={20} fill="#868E96" variant="filled" />
          </div>
          {/* title and description */}
          <div className="col-span-9 flex flex-col gap-1">
            <h6 className="text-sm font-semibold">Participant Approval</h6>
            <p className="text-xs font-medium text-placeholder">
              Confirm attendee registration before they join the event!
            </p>
          </div>
          {/* toggle */}
          <div className="col-span-2 h-full p-1 flex items-center justify-end">
            <Switch
              size="sm"
              color="secondary"
              isSelected={requiresApproval}
              onValueChange={(value) =>
                setValue("details.requiresApproval", value, {
                  shouldValidate: true,
                })
              }
            >
              <span className="sr-only">Requires Approval</span>
            </Switch>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ApprovalInput;
