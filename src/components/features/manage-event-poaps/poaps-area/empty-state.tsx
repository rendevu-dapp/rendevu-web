// react

// imports
import { Button, Card, CardBody } from "@heroui/react";
import { PlusIcon, TrophyIcon } from "@phosphor-icons/react";
import { FC } from "react";

// types
type PoapsEmptyStateProps = {
  onOpenCreatePoapDrawer: () => void;
};

const PoapsEmptyState: FC<PoapsEmptyStateProps> = ({
  onOpenCreatePoapDrawer,
}) => {
  return (
    <Card className="border-dashed border-2 border-gray-300">
      <CardBody className="text-center py-16">
        <div className="flex justify-center mb-6">
          <div className="p-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200">
            <TrophyIcon size={48} className="text-gray-400" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No POAPs yet
        </h3>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          Create your first POAP to reward attendees and create memorable
          digital collectibles for your event.
        </p>
        <Button
          color="primary"
          variant="flat"
          startContent={<PlusIcon size={16} />}
          onPress={onOpenCreatePoapDrawer}
        >
          Create First POAP
        </Button>
      </CardBody>
    </Card>
  );
};

export default PoapsEmptyState;
