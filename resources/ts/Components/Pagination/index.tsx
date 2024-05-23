import React, {useMemo} from 'react';
import styles from './style.module.scss';
import {PaginationProps} from "./index.d";
import AngleLeft from "../../../imgs/icons/angle-left.svg?react";
import AngleRight from "../../../imgs/icons/angle-right.svg?react";
import {Link} from "@inertiajs/react";

const Pagination: React.FC<PaginationProps> = ({meta, links,}) => {

    const currentPagePadded = useMemo(() => {
        return meta.current_page.toString().padStart(2, '0');
    }, [meta.current_page]);

    const lastPagePadded = useMemo(() => {
        return meta.last_page.toString().padStart(2, '0');
    }, [meta.last_page]);

    const isPrevDisabled = useMemo(() => meta.current_page <= 1, [meta.current_page]);
    const isNextDisabled = useMemo(() => meta.current_page >= meta.last_page, [meta.current_page, meta.last_page]);

    return (
        <div className={styles.container}>
            <Link href={links.prev} className={styles.angle} data-disabled={isPrevDisabled} >
                <AngleLeft />
            </Link>
            <div className={styles.block}>
                {currentPagePadded}<span className={styles.muted}>/{lastPagePadded}</span>
            </div>
            <Link href={links.next} className={styles.angle} data-disabled={isNextDisabled}>
                <AngleRight />
            </Link>
        </div>
    );
}


export default Pagination;
