import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectGroupsState } from "../../../store/selectors";

const Groups = () => {
  const groups = useSelector(selectGroupsState);

  return (
    <SContainer>
      <SListGroups>
        {groups.map((group) => (
          <SItemGroups key={group.id}>test</SItemGroups>
        ))}
      </SListGroups>
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
