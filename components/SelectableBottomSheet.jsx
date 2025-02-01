import React, { useRef, useCallback } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import Cross from "react-native-vector-icons/Entypo";

const SelectableBottomSheet = ({
    title,
    defaultSelect,
    dropDownDataList = [],
    onSelectItem,
    isDegree,
    name,
    searchText,
    onChangeSearchText,
    isSearchTrue,
    children,
}) => {
    const bottomSheetRef = useRef(null);

    const openBottomSheet = useCallback(() => {
        bottomSheetRef.current?.present();
    }, []);

    const handleModalClose = useCallback(() => {
        bottomSheetRef.current?.close();
    }, []);

    const handleItemSelect = useCallback(
        (item) => {
            onSelectItem(item);
            handleModalClose();
            if (isSearchTrue) {
                onChangeSearchText("");
            }
        },
        [isSearchTrue, onSelectItem, onChangeSearchText]
    );

    const handleClearSearch = useCallback(() => {
        if (isSearchTrue) {
            onChangeSearchText("");
        }
    }, [isSearchTrue, onChangeSearchText]);

    const renderBackdrop = useCallback(
        () => (
            <TouchableOpacity
                style={styles.overlay}
                activeOpacity={1}
                onPress={handleModalClose}
            />
        ),
        [handleModalClose]
    );

    const renderItem = useCallback(
        (item) => (
            <TouchableOpacity
                key={item?.id}
                activeOpacity={0.6}
                onPress={() => handleItemSelect(item)}
                style={[
                    styles.option,
                    { alignItems: isDegree ? "flex-start" : "center" },
                ]}
            >
                <Text style={styles.optionText} numberOfLines={2}>
                    {isDegree ? item[name] : item}
                </Text>
            </TouchableOpacity>
        ),
        [isDegree, name, handleItemSelect]
    );

    return (
        <View style={styles.container}>
            {children && React.isValidElement(children) ? (
                React.cloneElement(children, { onPress: openBottomSheet })
            ) : (
                <TouchableOpacity
                    onPress={openBottomSheet}
                    style={styles.dropdownButton}
                >
                    <Text style={styles.dropdownText} numberOfLines={1}>
                        {defaultSelect}
                    </Text>
                    <Icon name="caretdown" size={12} color="#686868" />
                </TouchableOpacity>
            )}

            <BottomSheetModal
                ref={bottomSheetRef}
                snapPoints={["50%", "60%"]}
                dismissOnPanDown={false}
                dismissOnBackdropPress={true}
                onDismiss={handleModalClose}
                backdropComponent={renderBackdrop}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>{title}</Text>
                    {isSearchTrue && (
                        <View style={styles.searchBtn}>
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search here..."
                                placeholderTextColor="gray"
                                value={searchText}
                                onChangeText={onChangeSearchText}
                            />
                            <TouchableOpacity onPress={handleClearSearch}>
                                <Cross name="cross" color="gray" size={25} />
                            </TouchableOpacity>
                        </View>
                    )}

                    {dropDownDataList.length === 0 && isSearchTrue && (
                        <View style={styles.noResults}>
                            <Text style={styles.noResultsText}>
                                Sorry, no matching options
                            </Text>
                        </View>
                    )}

                    <BottomSheetScrollView
                        contentContainerStyle={[
                            styles.scrollContent,
                            { marginTop: isSearchTrue ? 0 : 20 },
                        ]}
                        keyboardShouldPersistTaps="handled"
                    >
                        {dropDownDataList.map(renderItem)}
                    </BottomSheetScrollView>
                </View>
            </BottomSheetModal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // paddingVertical: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333333",
        paddingHorizontal: 20,
    },
    dropdownButton: {
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderWidth: 0.4,
        borderRadius: 5,
        backgroundColor: "#F1F3F7",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    dropdownText: {
        color: "#686868",
        fontWeight: "400",
        fontSize: 13,
        maxWidth: "98%",
    },
    searchBtn: {
        marginTop: 15,
        marginHorizontal: 20,
        borderWidth: 0.7,
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    searchInput: {
        width: "90%",
        paddingVertical: 5,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContainer: {
        flex: 1,
        width: "100%",
    },
    scrollContent: {
        flex: 1,
        paddingHorizontal: 20,
    },
    option: {
        marginBottom: 12,
        padding: 8,
        borderWidth: 0.5,
        borderRadius: 6,
        borderColor: "#ccc",
        width: "100%",
        justifyContent: "center",
        flexDirection: "row",
    },
    optionText: {
        color: "#333333",
        fontSize: 16,
        fontWeight: "400",
    },
    noResults: {
        marginVertical: 10,
        alignItems: "center",
    },
    noResultsText: {
        color: "gray",
    },
});

export default React.memo(SelectableBottomSheet);
