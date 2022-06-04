import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectGroupsState } from "../../../store/selectors";
import FormAddGroup from "../../FormAddGroup";

const Groups = () => {
  const groups = useSelector(selectGroupsState);

  return (
    <SContainer>
      {groups.length ? (
        <SListGroups>
          {groups.map((group) => (
            <SItemGroups key={group.id}>test</SItemGroups>
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

const SItemGroups = styled.li``;

export default Groups;
