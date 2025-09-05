"use client";

// heroui
import { Avatar, Button, Card, CardBody, Chip } from "@heroui/react";
// phosphor icons
import { Plus, Trophy, Users } from "@phosphor-icons/react";
// react
import { useState } from "react";

const PoapsArea = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  // mock poaps data - replace with actual data later
  const [poaps] = useState([
    {
      id: "1",
      name: "Early Bird Attendee",
      image: "/images/placeholders/poaps/image1.jpg",
      claimCount: 42,
      totalSupply: 100,
    },
    {
      id: "2",
      name: "Workshop Participant",
      image: "/images/placeholders/poaps/image1.jpg",
      claimCount: 18,
      totalSupply: 50,
    },
  ]);

  return (
    <div className="space-y-6">
      {/* fancy banner */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-100 via-secondary-50 to-primary-100 rounded-xl opacity-50"></div>
        <div className="relative bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl">
                <Trophy size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">POAPs</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Manage proof of attendance tokens for your event
                </p>
              </div>
            </div>
            <Button
              color="primary"
              startContent={<Plus size={16} />}
              onPress={() => setShowAddModal(true)}
              className="shadow-lg"
            >
              Add POAP
            </Button>
          </div>
        </div>
      </div>

      {/* poaps content */}
      {poaps.length === 0 ? (
        // empty state
        <Card className="border-dashed border-2 border-gray-300">
          <CardBody className="text-center py-16">
            <div className="flex justify-center mb-6">
              <div className="p-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200">
                <Trophy size={48} className="text-gray-400" />
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
              startContent={<Plus size={16} />}
              onPress={() => setShowAddModal(true)}
            >
              Create First POAP
            </Button>
          </CardBody>
        </Card>
      ) : (
        // poaps grid
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {poaps.map((poap) => (
            <Card
              key={poap.id}
              className="hover:shadow-lg transition-all duration-200 border"
            >
              <CardBody className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar
                    src={poap.image}
                    alt={poap.name}
                    size="lg"
                    className="shrink-0 ring-2 ring-primary-100"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-2 truncate">
                      {poap.name}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                      <Users size={16} />
                      <span>
                        {poap.claimCount} / {poap.totalSupply} claimed
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <Chip
                        size="sm"
                        variant="flat"
                        color={poap.claimCount > 0 ? "success" : "default"}
                      >
                        {poap.claimCount > 0 ? "Active" : "Unclaimed"}
                      </Chip>
                      <div className="text-xs text-gray-400">
                        {Math.round((poap.claimCount / poap.totalSupply) * 100)}
                        %
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      {/* modal/drawer placeholder */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Add POAP</h3>
            <p className="text-gray-500 mb-4">
              Modal/drawer implementation will go here
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="light" onPress={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button color="primary">Save</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PoapsArea;
