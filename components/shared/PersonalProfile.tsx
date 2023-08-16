"use client";
import React from "react";
import { UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown, message, Space, Tooltip } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";

const items: MenuProps["items"] = [
  {
    label: "Profile",
    key: "1",
    icon: <Image src={"/user.svg"} alt={"Profile"} width={24} height={24} />,
  },
  {
    label: "Setting",
    key: "2",
    icon: <Image src={"/setting.svg"} alt={"Setting"} width={24} height={24} />,
  },
];

const PersonalProfile: React.FC = ({ name }) => {

  const router = useRouter();
  const handleItemClick = (key: string) => {
    if (key === "1") {
      router.push("/profile");
    } else if (key === "2") {
      router.push("/setting");
    }
  };

  const menuProps = {
    items: items.map((item) => ({
      ...item,
      onClick: () => handleItemClick(item.key),
    })),
  };

  return (
    <Space wrap>
      <Dropdown.Button
        menu={menuProps}
        placement="bottomLeft"
        icon={<UserOutlined className="text-heading text-light-2" />}
      >
        <h4 className="text-heading text-light-2">{name}</h4>
      </Dropdown.Button>
    </Space>
  );
};

export default PersonalProfile;
