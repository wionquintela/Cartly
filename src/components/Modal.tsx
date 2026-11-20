import { Dispatch, SetStateAction } from "react";
import { Modal, Pressable, Text, View } from "react-native";

interface ChildProps {
  title: string;
  subtitle: string;
  buttonText: string;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const CustomModal = ({
  title,
  subtitle,
  buttonText,
  showModal,
  setShowModal,
}: ChildProps) => {
  return (
    <Modal
      animationType="fade"
      visible={showModal}
      transparent={true}
      onRequestClose={() => {
        alert("Modal has been closed.");
        setShowModal(!showModal);
      }}
    >
      <View className="flex-1 justify-center items-center">
        <View className="border border-base-300 bg-base-100 pt-10 shadow-lg m-5 rounded-lg">
          <View className="flex justify-center items-center px-10">
            <Text className="text-lg text-base-content">{title}</Text>
            <Text className="text-sm text-base-content/75 mt-2">
              {subtitle}
            </Text>
          </View>
          <Pressable
            className="rounded-b-lg mt-5 bg-neutral active:bg-neutral/75 flex justify-center items-center py-5"
            onPress={() => setShowModal(!showModal)}
          >
            {({ pressed }) => (
              <Text
                className={
                  pressed ? "text-neutral-content/75" : "text-neutral-content"
                }
              >
                {buttonText}
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
