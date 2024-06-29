import React from "react";
import { Flex, IconButton, Text, Tooltip } from "@chakra-ui/react";
import {
    ArrowRightIcon,
    ArrowLeftIcon,
    ChevronRightIcon,
    ChevronLeftIcon
} from "@chakra-ui/icons";

const Pager = (props: {
    page: any,
    pageCount: any,
    setPage: any
}) => (
    <Flex justifyContent="center" m={4} alignItems="center">
        <Flex>
            <Tooltip label="P&aacute;gina inicial">
                <IconButton
                    aria-label='Pagina inicial'
                    onClick={() => props.setPage(1)}
                    isDisabled={(props.page == 1)}
                    icon={<ArrowLeftIcon h={3} w={3} />}
                    mr={4}
                />
            </Tooltip>
            <Tooltip label="P&aacute;gina anterior">
                <IconButton
                    aria-label='P&aacute;gina anterior'
                    onClick={() => props.setPage(props.page - 1)}
                    isDisabled={(props.page == 1)}
                    icon={<ChevronLeftIcon h={6} w={6} />}
                />
            </Tooltip>
        </Flex>

        <Flex alignItems="center">
            <Text mx={8}>
                P&aacute;gina{" "}
                <Text fontWeight="bold" as="span">
                    {props.page}
                </Text>{" "}
                /{" "}
                <Text fontWeight="bold" as="span">
                    {props.pageCount}
                </Text>
            </Text>
        </Flex>

        <Flex>
            <Tooltip label="Pr&oacute;xima p&aacute;gina">
                <IconButton
                    aria-label='Prox. p&aacute;gina'
                    onClick={() => props.setPage(props.page + 1)}
                    isDisabled={!(props.pageCount > props.page)}
                    icon={<ChevronRightIcon h={6} w={6} />}
                />
            </Tooltip>
            <Tooltip label="&Uacute;ltima p&aacute;gina">
                <IconButton
                    aria-label='Ultima pagina'
                    onClick={() => props.setPage(props.pageCount)}
                    isDisabled={!(props.pageCount > props.page)}
                    icon={<ArrowRightIcon h={3} w={3} />}
                    ml={4}
                />
            </Tooltip>
        </Flex>
    </Flex>
);

export default Pager;
