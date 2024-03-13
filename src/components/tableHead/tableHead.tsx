import { Table, UnstyledButton } from "@mantine/core";
import {
  IconChevronDown,
  IconChevronUp,
  IconSelector,
} from "@tabler/icons-react";

interface ITableHeadProps {
  children: React.ReactNode;
  isDescending: boolean;
  sorted: boolean;
  onSort: () => void;
}

const TableHead = ({
  children,
  isDescending,
  sorted,
  onSort,
}: ITableHeadProps) => {
  const Icon = sorted
    ? isDescending
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <Table.Th>
      <UnstyledButton onClick={onSort}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
          }}
        >
          {children}
          <Icon style={{ width: 16, height: 16 }} stroke={1.5} />
        </div>
      </UnstyledButton>
    </Table.Th>
  );
};

export default TableHead;
