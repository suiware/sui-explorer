// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

/**
 * This is an App UI Component, which is responsible for network selection.
 * It's as context un-aware as it reasonably can be, being a controlled component.
 * In the future, this should move outside of the base `~/ui/` directory, but for
 * now we are including App UI Components in the base UI component directory.
 */

import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  shift,
  useFloating,
} from "@floating-ui/react";
import { Popover } from "@headlessui/react";
import { useZodForm } from "@mysten/core";
import { HamburgerRest16 } from "@mysten/icons";
import { Text } from "@mysten/ui";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { z } from "zod";

import { NavItem } from "./NavItem";
import { ReactComponent as CheckIcon } from "../icons/check_16x16.svg";
import { ReactComponent as MenuIcon } from "../icons/menu.svg";

import type { ComponentProps, ReactNode } from "react";

export interface NetworkOption {
  id: string;
  label: string;
}

export interface NetworkSelectProps {
  networks: NetworkOption[];
  value: string;
  version?: number | string;
  binaryVersion?: string;
  onChange(networkId: string): void;
}

enum NetworkState {
  UNSELECTED = "UNSELECTED",
  PENDING = "PENDING",
  SELECTED = "SELECTED",
}

interface SelectableNetworkProps extends ComponentProps<"div"> {
  state: NetworkState;
  children: ReactNode;
  onClick(): void;
}

function SelectableNetwork({
  state,
  children,
  onClick,
  ...props
}: SelectableNetworkProps) {
  return (
    <div
      role="button"
      onClick={onClick}
      className={clsx(
        "flex items-start gap-3 rounded-md px-1.25 py-2 text-body font-semibold hover:bg-gray-40 ui-active:bg-gray-40",
        state !== NetworkState.UNSELECTED
          ? "text-steel-darker"
          : "text-steel-dark"
      )}
      {...props}
    >
      <CheckIcon
        className={clsx("flex-shrink-0", {
          "text-success": state === NetworkState.SELECTED,
          "text-steel": state === NetworkState.PENDING,
          "text-gray-45": state === NetworkState.UNSELECTED,
        })}
      />
      <div className="mt-px">
        <Text
          variant="body/semibold"
          color={
            state === NetworkState.SELECTED ? "steel-darker" : "steel-dark"
          }
        >
          {children}
        </Text>
      </div>
    </div>
  );
}

const CustomRPCSchema = z.object({
  url: z.string().url(),
});

function CustomRPCInput({
  value,
  onChange,
}: {
  value: string;
  onChange(networkUrl: string): void;
}) {
  const { register, handleSubmit, formState } = useZodForm({
    schema: CustomRPCSchema,
    mode: "all",
    defaultValues: {
      url: value,
    },
  });

  const { errors, isDirty, isValid } = formState;

  return (
    <form
      onSubmit={handleSubmit((values) => {
        onChange(values.url);
      })}
      className="relative flex items-center rounded-md"
    >
      <input
        {...register("url")}
        type="text"
        className={clsx(
          "block w-full rounded-md border p-3 pr-16 shadow-sm outline-none",
          errors.url
            ? "border-issue-dark text-issue-dark"
            : "border-gray-65 text-gray-90"
        )}
      />

      <div className="absolute inset-y-0 right-0 flex flex-col justify-center px-3">
        <button
          disabled={!isDirty || !isValid}
          type="submit"
          className="flex items-center justify-center rounded-full bg-gray-90 px-2 py-1 text-captionSmall font-semibold uppercase text-white transition disabled:bg-gray-45 disabled:text-gray-65"
        >
          Save
        </button>
      </div>
    </form>
  );
}

function NetworkVersion({
  label,
  version,
  binaryVersion,
}: {
  label: string;
  version: number | string;
  binaryVersion: string;
}) {
  return (
    <div className="flex flex-col justify-between gap-1 px-4 py-3">
      <Text variant="subtitleSmall/medium" color="steel-dark">
        Sui {label}
      </Text>
      <Text variant="subtitleSmall/medium" color="steel-dark">
        v{binaryVersion} (Protocol {version})
      </Text>
    </div>
  );
}

function NetworkSelectPanel({
  networks,
  onChange,
  value,
}: Omit<NetworkSelectProps, "version">) {
  const isCustomNetwork = !networks.find(({ id }) => id === value);
  const [customOpen, setCustomOpen] = useState(isCustomNetwork);

  useEffect(() => {
    setCustomOpen(isCustomNetwork);
  }, [isCustomNetwork]);

  return (
    <>
      {networks.map((network) => (
        <SelectableNetwork
          key={network.id}
          state={
            !customOpen && value === network.id
              ? NetworkState.SELECTED
              : NetworkState.UNSELECTED
          }
          onClick={() => {
            onChange(network.id);
          }}
        >
          {network.label}
        </SelectableNetwork>
      ))}

      <SelectableNetwork
        state={
          isCustomNetwork
            ? NetworkState.SELECTED
            : customOpen
            ? NetworkState.PENDING
            : NetworkState.UNSELECTED
        }
        onClick={() => setCustomOpen(true)}
      >
        Custom RPC URL
        {customOpen && (
          <div className="mt-3">
            <CustomRPCInput
              value={isCustomNetwork ? value : ""}
              onChange={onChange}
            />
          </div>
        )}
      </SelectableNetwork>
    </>
  );
}

function ResponsiveIcon() {
  return (
    <div>
      <HamburgerRest16 className="hidden md:block" />
      <MenuIcon className="block md:hidden" />
    </div>
  );
}

export function NetworkSelect({
  networks,
  value,
  version,
  binaryVersion,
  onChange,
}: NetworkSelectProps) {
  return <></>;
}
