"use client";

import {Ref, useRef} from "react";
import {getHotkeyHandler, HotkeyItem, mergeRefs, useHotkeys} from "@mantine/hooks";
import {Badge, TextInput, TextInputProps} from "@mantine/core";
import {IconSearch} from "@tabler/icons-react";
import classes from "@/app/global.module.css";


interface SearchBarProps extends Omit<TextInputProps, "onChange"> {
  onChange?: (value: string) => void;
  ref?: Ref<HTMLInputElement>,
  hotkeys?: string[]
}


export const SearchBar = ({classNames, ref, onChange, hotkeys: hotkeys_, ...props}: SearchBarProps) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const mergedRef = mergeRefs(ref, searchRef);


  const hotkeys = hotkeys_ ?? ["mod+K"];
  const hotkeyParams = hotkeys.map((hotkey) => [hotkey, () => searchRef.current?.focus()])

  // @ts-ignore
  useHotkeys(hotkeyParams)

  const mergedClassNames = {
    ...classNames,
    // @ts-ignore
    input: `${classes.shadowInput} ${classNames?.input}`
  }

  return (
    <TextInput ref={mergedRef} placeholder={"请输入"}
               leftSectionPointerEvents={"none"} leftSection={<IconSearch size={16} stroke={1.5}/>}
               rightSectionWidth={60}
               rightSectionPointerEvents={"none"}
               rightSection={<Badge variant={"light"} radius={"sm"}>⌘ + K</Badge>}
               classNames={mergedClassNames}
               onChange={(e) => onChange?.(e.currentTarget.value)}
               onKeyDown={getHotkeyHandler([
                 ['Escape', () => {
                   if (onChange) {
                     onChange('')
                   }
                 }]
               ])}
               {...props}
    />
  )
}

SearchBar.displayName = "SearchBar";