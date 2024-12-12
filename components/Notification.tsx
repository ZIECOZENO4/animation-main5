import React from "react";
import {Tabs, Tab, Card, CardBody, Switch} from "@nextui-org/react";
import RewardCard from "./transactioncontent";
import { NavigationBar } from "@/app/test/navbar22";



export default function NotificationAlert() {
  const [isVertical, setIsVertical] = React.useState(false);
  return (
    <div className="flex flex-col w-full px-4 md:px-8">
      <div className="flex w-full flex-col">
        <Tabs 
          aria-label="Options" 
          isVertical={isVertical}  
          variant='bordered' 
          className='w-full'
          classNames={{
            tabList: "w-full",
            tab: "flex-1",
            cursor: "w-full",
          }}
        >
          <Tab key="All" title="All">
            <Card className="w-full">
              <CardBody className='flex flex-col gap-4 space-y-2 text-center align-middle'>
        <RewardCard />
              </CardBody>
            </Card>  
          </Tab>
          <Tab key="Pending" title="Pending">
            <Card className="w-full">
              <CardBody className='flex flex-col gap-4 space-y-2 text-center align-middle'>
              <RewardCard />
              </CardBody>
            </Card>  
          </Tab>
          <Tab key="Completed" title="Completed">
            <Card className="w-full">
              <CardBody className='flex flex-col gap-4 space-y-2 text-center align-middle'>
              <RewardCard />
              </CardBody>
            </Card>  
          </Tab>
          <Tab key="Failed" title="Failed">
            <Card className="w-full">
              <CardBody className='flex flex-col gap-4 space-y-2 text-center align-middle'>
              <RewardCard />
              </CardBody>
            </Card>  
          </Tab>
        </Tabs>
        <NavigationBar />
      </div>
    </div>
  );
}