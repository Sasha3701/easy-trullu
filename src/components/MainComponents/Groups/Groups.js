import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectGroupsState } from "../../../store/selectors";
import FormAddGroup from "../FormAddGroup";
import Group from "./Group";
import { useState } from "react";

const Groups = () => {
  const groups = useSelector(selectGroupsState);
  const [currentGroup, setCurrentGroup] = useState(null);

  return (
    <SContainer>
      {groups.length ? (
        <SListGroups>
          {groups.map((group) => (
            <SItemGroups key={group.id}>
              <Group
                group={group}
                currentGroup={currentGroup}
                setCurrentGroup={setCurrentGroup}
              />
            </SItemGroups>
          ))}
        </SListGroups>
      ) : null}
      <FormAddGroup />
    </SContainer>
  );
};

const SContainer = styled.div`
  display: flex;
`;

const SListGroups = styled.ul`
  display: flex;
  list-style: none;
`;

const SItemGroups = styled.li`
  margin-right: 10px;
`;

export default Groups;
