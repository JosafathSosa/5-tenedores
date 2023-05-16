import React, { useState } from "react";
import { View, Text } from "react-native";
import { ListItem, Icon } from "@rneui/base";
import { map } from "lodash";
import { Modal } from "../../components/Shared";

import { ChangeNameForm } from "./ChangeNameForm";
import { ChangeEmailForm } from "./ChangeEmailForm";
import { ChangePasswordForm } from "./ChangePasswordForm";

export function AccountOptions(props) {
  const { onReload } = props;

  const [showModal, setShowModal] = useState(false);
  const [renderModal, setRenderModal] = useState(null);

  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

  const selectedComponent = (key) => {
    if (key === "displayName") {
      setRenderModal(
        <ChangeNameForm onClose={onCloseOpenModal} onReload={onReload} />
      );
    }

    if (key === "email") {
      setRenderModal(
        <ChangeEmailForm onClose={onCloseOpenModal} onReload={onReload} />
      );
    }

    if (key === "password") {
      setRenderModal(<ChangePasswordForm onClose={onCloseOpenModal} />);
    }
    onCloseOpenModal();
  };
  const menuOptions = getMenuOptions(selectedComponent);

  return (
    <View>
      {map(menuOptions, (menu, index) => (
        <ListItem key={index} bottomDivider onPress={menu.onPress}>
          <Icon
            type={menu.iconType}
            name={menu.iconNameLeft}
            color={menu.iconColorLeft}
          />
          <ListItem.Content>
            <ListItem.Title>{menu.title}</ListItem.Title>
          </ListItem.Content>
          <Icon
            type={menu.iconType}
            name={menu.iconNameRight}
            color={menu.iconColorRight}
          />
        </ListItem>
      ))}

      <Modal show={showModal} close={onCloseOpenModal}>
        {renderModal}
      </Modal>
    </View>
  );
}

function getMenuOptions(selectedComponent) {
  return [
    {
      title: "Cambiar nombre y apellido",
      iconType: "material-community",
      iconNameLeft: "account-circle",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent("displayName"),
    },
    {
      title: "Cambiar email",
      iconType: "material-community",
      iconNameLeft: "at",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent("email"),
    },
    {
      title: "Cambiar contraseña",
      iconType: "material-community",
      iconNameLeft: "lock-reset",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent("password"),
    },
  ];
}
