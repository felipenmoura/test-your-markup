!function(scope, undefined){

	var getEl= function(qr){ return document.querySelector(qr); },
		startTrigger= getEl('.start-trying'),
		mightness= getEl('.mightness'),
		menu= getEl('.menu'),
		timer= getEl('.timer'),
		body= document.body,
		input= document.getElementById('input-word'),
		tableset= document.getElementById('tableset'),
		finalResult= document.querySelector('.final-result'),
		giveUpBtn= document.querySelector('.give-up'),
		usedWords= document.querySelector('.used-words'),
		curLevelLabel= document.querySelector('.cur-level-label'),
		cl= input.classList;
		levels= [20, 40, 60, 80, 95],
		speed= 90,
		range= 20,
		currentRange= 0,
		energyTarget= 0,
		energyBurn= 0.2,
		flags= {
			gameStarted: false,
			currentLevel: 0,
			currentTime: 0,
			timeLimit: 10,
			hitting: false
		},
		levelLabels= ['Wood', 'Brick', 'Stone', 'Ice', 'Iron'],
		hitEnergy= 0,
		energy= 0;

	var lists= {
		cheat: ['aaaaaaa', 'bbbbbbb', 'ccccccc', 'ddddddd', 'eeeeeee', 'fffffff', 'ggggggg', 'hhhhhhh', 'iiiiiii', 'jjjjjjj', 'kkkkkkk', 'lllllll', 'mmmmmmm', 'nnnnnnn', 'ooooooo', 'ppppppp', 'qqqqqqq', 'rrrrrrr', 'sssssss', 'ttttttt', 'uuuuuuu', 'vvvvvvv', 'xxxxxxx', 'yyyyyyy', 'wwwwwww', 'zzzzzzz'],
		html5: ["html","head","title","base","link","meta","style","script","noscript","template","body","section","nav","article","aside","h1","h2","h3","h4","h5","h6","h1","h6","header","footer","address","main","p","hr","pre","blockquote","ol","ul","li","dl","dt","dd","dd","figure","figcaption","div","a","em","strong","small","s","cite","q","dfn","abbr","title","data","time","datetime","code","var","samp","kbd","sub","sup","i","b","u","mark","ruby","rt","rp","bdi","bdo","span","class","lang","dir","br","wbr","ins","del","img","iframe","embed","object","param","object","video","audio","source","video","audio","track","video","audio","canvas","map","area","area","map","svg","math","table","caption","colgroup","col","tbody","thead","tfoot","tr","td","th","form","fieldset","legend","fieldset","label","input","button","select","datalist","optgroup","option","select","datalist","textarea","keygen","output","progress","meter","details","summary","details","menuitem","menu"],
		periodicTable: ["h","he","li","be","b","c","n","o","f","ne","na","mg","al","si","p","s","cl","ar","k","ca","sc","ti","v","cr"," mn","fe","co","ni","cu","zn","ga","ge","as","se","br","kr","rb","sr","y","zr","nb","mo","tc","ru","rh","pd","ag","cd","in","sn","sb","te","i","xe","cs","ba","la","ce","pr","nd","pm","sm","eu","gd","tb","dy","ho","er","tm","yb","lu","hf","ta","w","re","os","ir","pt","au","hg","tl","pb","bi","po","at","rn","fr","ra","ac","th","pa","u","np","pu","am","cm","bk","cf","es","fm","md","no","lr","rf","db","sg","bh","hs","mt"],
		countries: ["afghanistan","albania","algeria","american samoa","andorra","angola","anguilla","antigua and barbuda","argentina","armenia","aruba","australia","austria","azerbaijan","bahamas","bahrain","bangladesh","barbados","belarus","belgium","belize","benin","bermuda","bhutan","bolivia","bosnia and herzegovina","botswana","brazil","british virgin islands","brunei","bulgaria","burkina faso","burundi","cambodia","cameroon","canada","cape verde","cayman islands","central african republic","chad","chile","china","colombia","comoros","cook islands","costa rica","croatia","cuba","curacao","cyprus","czech republic","côte d'ivoire","denmark","djibouti","dominica","dominican republic","dr congo","east timor","ecuador","egypt","el salvador","equatorial guinea","eritrea","estonia","ethiopia","falkland islands","faroe islands","federated states of micronesia","fiji","finland","france","french guiana","french polynesia","gabon","gambia","georgia","germany","ghana","gibraltar","greece","greenland","grenada","guadeloupe","guam","guatemala","guernsey","guinea","guinea-bissau","guyana","haiti","honduras","hong kong","hungary","iceland","india","indonesia","iran","iraq","ireland","isle of man","israel","italy","jamaica","japan","jersey","jordan","kazakhstan","kenya","kiribati","kosovo","kuwait","kyrgyzstan","laos","latvia","lebanon","lesotho","liberia","libya","liechtenstein","lithuania","luxembourg","macau","macedonia","madagascar","malawi","malaysia","maldives","mali","malta","marshall islands","martinique","mauritania","mauritius","mayotte","mexico","moldova","monaco","mongolia","montenegro","montserrat","morocco","mozambique","myanmar","namibia","nauru","  nepal","netherlands","new caledonia","new zealand","nicaragua","niger","nigeria","niue","north korea","northern mariana islands","norway","oman","pakistan","palau","palestinian territories","panama","papua new guinea","paraguay","peru","philippines","pitcairn islands","poland","portugal","puerto rico","qatar","republic of the congo","romania","russia","rwanda","réunion","saint barthelemy","saint helena","saint kitts and nevis","saint lucia","saint martin","saint pierre and miquelon","saint vincent and the grenadines","samoa","san marino","sao tome and principe","saudi arabia","senegal","serbia","seychelles","sierra leone","singapore","sint maarten","slovakia","slovenia","solomon islands","somalia","south africa","south korea","south sudan","spain","sri lanka","sudan","suriname","swaziland","sweden"," switzerland","syria","taiwan","tajikistan","tanzania","thailand","togo","tokelau","tonga","trinidad and tobago","tunisia","turkey","turkmenistan","turks and caicos islands","tuvalu","uganda","ukraine","united arab emirates","united kingdom","united states","united states virgin islands","uruguay","uzbekistan","vanuatu","venezuela","vietnam","wallis and futuna","western sahara","world","yemen","zambia","zimbabwe"],
        'js-libs': ["chr.js","chr","dojo toolkit","jquery","midori","mootools","react","anychart","d3.js","highcharts","p5.js","pixi.js","plotly","raphaël","swfobject","velocity","whitestormjs","bootstrap","dhtmlx","jqwidgets","qooxdoo","smartclient","webix","winjs","gijgo","glow","script.aculo.us","joose","jsphp","mochikit","pdf.js","pdfjs","rico","jquery mobile","mustache","jasmine","mocha","qunit","tape","angularjs","aurelia","cappuccino","echo","ember.js","ember","enyo","ext js","ext","javascriptmvc","knockout","meteor","mojito","node.js","node","sproutcore","modernizr","wakanda","ajax","prototype","easeljs","infovis","processing","processingjs","processing.js","three","threejs","three.js","angular","devextreme","dojo","extjs","ext.js","zurb","polymer","jquery ui","jqueryui","ignite","igniteui","kendo","kendoui","wijmo","openui5","ample","lively","yui","spry","socketio","socket.io","underscore","underscore.js","cascade","jinja","twig","jsunit","unit","backbone","chaplin","vue","cassowary","rialto","next","dsw","gulp","grunt","npm","nvm","n"],
        'php-functions': ["zend_version", "func_num_args", "func_get_arg", "func_get_args", "strlen", "strcmp", "strncmp", "strcasecmp", "strncasecmp", "each", "error_reporting", "define", "defined", "get_class", "get_called_class", "get_parent_class", "method_exists", "property_exists", "class_exists", "interface_exists", "trait_exists", "function_exists", "class_alias", "get_included_files", "get_required_files", "is_subclass_of", "is_a", "get_class_vars", "get_object_vars", "get_class_methods", "trigger_error", "user_error", "set_error_handler", "restore_error_handler", "set_exception_handler", "restore_exception_handler", "get_declared_classes", "get_declared_traits", "get_declared_interfaces", "get_defined_functions", "get_defined_vars", "create_function", "get_resource_type", "get_resources", "get_loaded_extensions", "extension_loaded", "get_extension_funcs", "get_defined_constants", "debug_backtrace", "debug_print_backtrace", "gc_mem_caches", "gc_collect_cycles", "gc_enabled", "gc_enable", "gc_disable", "strtotime", "date", "idate", "gmdate", "mktime", "gmmktime", "checkdate", "strftime", "gmstrftime", "time", "localtime", "getdate", "date_create", "date_create_immutable", "date_create_from_format", "date_create_immutable_from_format", "date_parse", "date_parse_from_format", "date_get_last_errors", "date_format", "date_modify", "date_add", "date_sub", "date_timezone_get", "date_timezone_set", "date_offset_get", "date_diff", "date_time_set", "date_date_set", "date_isodate_set", "date_timestamp_set", "date_timestamp_get", "timezone_open", "timezone_name_get", "timezone_name_from_abbr", "timezone_offset_get", "timezone_transitions_get", "timezone_location_get", "timezone_identifiers_list", "timezone_abbreviations_list", "timezone_version_get", "date_interval_create_from_date_string", "date_interval_format", "date_default_timezone_set", "date_default_timezone_get", "date_sunrise", "date_sunset", "date_sun_info", "libxml_set_streams_context", "libxml_use_internal_errors", "libxml_get_last_error", "libxml_clear_errors", "libxml_get_errors", "libxml_disable_entity_loader", "libxml_set_external_entity_loader", "openssl_get_cert_locations", "openssl_spki_new", "openssl_spki_verify", "openssl_spki_export", "openssl_spki_export_challenge", "openssl_pkey_free", "openssl_pkey_new", "openssl_pkey_export", "openssl_pkey_export_to_file", "openssl_pkey_get_private", "openssl_pkey_get_public", "openssl_pkey_get_details", "openssl_free_key", "openssl_get_privatekey", "openssl_get_publickey", "openssl_x509_read", "openssl_x509_free", "openssl_x509_parse", "openssl_x509_checkpurpose", "openssl_x509_check_private_key", "openssl_x509_export", "openssl_x509_fingerprint", "openssl_x509_export_to_file", "openssl_pkcs12_export", "openssl_pkcs12_export_to_file", "openssl_pkcs12_read", "openssl_csr_new", "openssl_csr_export", "openssl_csr_export_to_file", "openssl_csr_sign", "openssl_csr_get_subject", "openssl_csr_get_public_key", "openssl_digest", "openssl_encrypt", "openssl_decrypt", "openssl_cipher_iv_length", "openssl_sign", "openssl_verify", "openssl_seal", "openssl_open", "openssl_pbkdf2", "openssl_pkcs7_verify", "openssl_pkcs7_decrypt", "openssl_pkcs7_sign", "openssl_pkcs7_encrypt", "openssl_private_encrypt", "openssl_private_decrypt", "openssl_public_encrypt", "openssl_public_decrypt", "openssl_get_md_methods", "openssl_get_cipher_methods", "openssl_get_curve_names", "openssl_dh_compute_key", "openssl_random_pseudo_bytes", "openssl_error_string", "preg_match", "preg_match_all", "preg_replace", "preg_replace_callback", "preg_replace_callback_array", "preg_filter", "preg_split", "preg_quote", "preg_grep", "preg_last_error", "readgzfile", "gzrewind", "gzclose", "gzeof", "gzgetc", "gzgets", "gzgetss", "gzread", "gzopen", "gzpassthru", "gzseek", "gztell", "gzwrite", "gzputs", "gzfile", "gzcompress", "gzuncompress", "gzdeflate", "gzinflate", "gzencode", "gzdecode", "zlib_encode", "zlib_decode", "zlib_get_coding_type", "deflate_init", "deflate_add", "inflate_init", "inflate_add", "ob_gzhandler", "bcadd", "bcsub", "bcmul", "bcdiv", "bcmod", "bcpow", "bcsqrt", "bcscale", "bccomp", "bcpowmod", "bzopen", "bzread", "bzwrite", "bzflush", "bzclose", "bzerrno", "bzerrstr", "bzerror", "bzcompress", "bzdecompress", "jdtogregorian", "gregoriantojd", "jdtojulian", "juliantojd", "jdtojewish", "jewishtojd", "jdtofrench", "frenchtojd", "jddayofweek", "jdmonthname", "easter_date", "easter_days", "unixtojd", "jdtounix", "cal_to_jd", "cal_from_jd", "cal_days_in_month", "cal_info", "ctype_alnum", "ctype_alpha", "ctype_cntrl", "ctype_digit", "ctype_lower", "ctype_graph", "ctype_print", "ctype_punct", "ctype_space", "ctype_upper", "ctype_xdigit", "curl_init", "curl_copy_handle", "curl_version", "curl_setopt", "curl_setopt_array", "curl_exec", "curl_getinfo", "curl_error", "curl_errno", "curl_close", "curl_strerror", "curl_multi_strerror", "curl_share_strerror", "curl_reset", "curl_escape", "curl_unescape", "curl_pause", "curl_multi_init", "curl_multi_add_handle", "curl_multi_remove_handle", "curl_multi_select", "curl_multi_exec", "curl_multi_getcontent", "curl_multi_info_read", "curl_multi_close", "curl_multi_errno", "curl_multi_setopt", "curl_share_init", "curl_share_close", "curl_share_setopt", "curl_share_errno", "curl_file_create", "dom_import_simplexml", "exif_read_data", "read_exif_data", "exif_tagname", "exif_thumbnail", "exif_imagetype", "finfo_open", "finfo_close", "finfo_set_flags", "finfo_file", "finfo_buffer", "mime_content_type", "filter_input", "filter_var", "filter_input_array", "filter_var_array", "filter_list", "filter_has_var", "filter_id", "ftp_connect", "ftp_ssl_connect", "ftp_login", "ftp_pwd", "ftp_cdup", "ftp_chdir", "ftp_exec", "ftp_raw", "ftp_mkdir", "ftp_rmdir", "ftp_chmod", "ftp_alloc", "ftp_nlist", "ftp_rawlist", "ftp_systype", "ftp_pasv", "ftp_get", "ftp_fget", "ftp_put", "ftp_fput", "ftp_size", "ftp_mdtm", "ftp_rename", "ftp_delete", "ftp_site", "ftp_close", "ftp_set_option", "ftp_get_option", "ftp_nb_fget", "ftp_nb_get", "ftp_nb_continue", "ftp_nb_put", "ftp_nb_fput", "ftp_quit", "gd_info", "imagearc", "imageellipse", "imagechar", "imagecharup", "imagecolorat", "imagecolorallocate", "imagepalettecopy", "imagecreatefromstring", "imagecolorclosest", "imagecolorclosesthwb", "imagecolordeallocate", "imagecolorresolve", "imagecolorexact", "imagecolorset", "imagecolortransparent", "imagecolorstotal", "imagecolorsforindex", "imagecopy", "imagecopymerge", "imagecopymergegray", "imagecopyresized", "imagecreate", "imagecreatetruecolor", "imageistruecolor", "imagetruecolortopalette", "imagepalettetotruecolor", "imagesetthickness", "imagefilledarc", "imagefilledellipse", "imagealphablending", "imagesavealpha", "imagecolorallocatealpha", "imagecolorresolvealpha", "imagecolorclosestalpha", "imagecolorexactalpha", "imagecopyresampled", "imagerotate", "imageflip", "imageantialias", "imagecrop", "imagecropauto", "imagescale", "imageaffine", "imageaffinematrixconcat", "imageaffinematrixget", "imagesetinterpolation", "imagesettile", "imagesetbrush", "imagesetstyle", "imagecreatefrompng", "imagecreatefromgif", "imagecreatefromjpeg", "imagecreatefromwbmp", "imagecreatefromxbm", "imagecreatefromgd", "imagecreatefromgd2", "imagecreatefromgd2part", "imagepng", "imagegif", "imagejpeg", "imagewbmp", "imagegd", "imagegd2", "imagedestroy", "imagegammacorrect", "imagefill", "imagefilledpolygon", "imagefilledrectangle", "imagefilltoborder", "imagefontwidth", "imagefontheight", "imageinterlace", "imageline", "imageloadfont", "imagepolygon", "imagerectangle", "imagesetpixel", "imagestring", "imagestringup", "imagesx", "imagesy", "imagedashedline", "imagettfbbox", "imagettftext", "imageftbbox", "imagefttext", "imagetypes", "jpeg2wbmp", "png2wbmp", "image2wbmp", "imagelayereffect", "imagexbm", "imagecolormatch", "imagefilter", "imageconvolution", "hash", "hash_file", "hash_hmac", "hash_hmac_file", "hash_init", "hash_update", "hash_update_stream", "hash_update_file", "hash_final", "hash_copy", "hash_algos", "hash_pbkdf2", "hash_equals", "mhash_keygen_s2k", "mhash_get_block_size", "mhash_get_hash_name", "mhash_count", "mhash", "iconv", "iconv_get_encoding", "iconv_set_encoding", "iconv_strlen", "iconv_substr", "iconv_strpos", "iconv_strrpos", "iconv_mime_encode", "iconv_mime_decode", "iconv_mime_decode_headers", "collator_create", "collator_compare", "collator_get_attribute", "collator_set_attribute", "collator_get_strength", "collator_set_strength", "collator_sort", "collator_sort_with_sort_keys", "collator_asort", "collator_get_locale", "collator_get_error_code", "collator_get_error_message", "collator_get_sort_key", "numfmt_create", "numfmt_format", "numfmt_parse", "numfmt_format_currency", "numfmt_parse_currency", "numfmt_set_attribute", "numfmt_get_attribute", "numfmt_set_text_attribute", "numfmt_get_text_attribute", "numfmt_set_symbol", "numfmt_get_symbol", "numfmt_set_pattern", "numfmt_get_pattern", "numfmt_get_locale", "numfmt_get_error_code", "numfmt_get_error_message", "normalizer_normalize", "normalizer_is_normalized", "locale_get_default", "locale_set_default", "locale_get_primary_language", "locale_get_script", "locale_get_region", "locale_get_keywords", "locale_get_display_script", "locale_get_display_region", "locale_get_display_name", "locale_get_display_language", "locale_get_display_variant", "locale_compose", "locale_parse", "locale_get_all_variants", "locale_filter_matches", "locale_canonicalize", "locale_lookup", "locale_accept_from_http", "msgfmt_create", "msgfmt_format", "msgfmt_format_message", "msgfmt_parse", "msgfmt_parse_message", "msgfmt_set_pattern", "msgfmt_get_pattern", "msgfmt_get_locale", "msgfmt_get_error_code", "msgfmt_get_error_message", "datefmt_create", "datefmt_get_datetype", "datefmt_get_timetype", "datefmt_get_calendar", "datefmt_get_calendar_object", "datefmt_set_calendar", "datefmt_get_locale", "datefmt_get_timezone_id", "datefmt_get_timezone", "datefmt_set_timezone", "datefmt_get_pattern", "datefmt_set_pattern", "datefmt_is_lenient", "datefmt_set_lenient", "datefmt_format", "datefmt_format_object", "datefmt_parse", "datefmt_localtime", "datefmt_get_error_code", "datefmt_get_error_message", "grapheme_strlen", "grapheme_strpos", "grapheme_stripos", "grapheme_strrpos", "grapheme_strripos", "grapheme_substr", "grapheme_strstr", "grapheme_stristr", "grapheme_extract", "idn_to_ascii", "idn_to_utf8", "resourcebundle_create", "resourcebundle_get", "resourcebundle_count", "resourcebundle_locales", "resourcebundle_get_error_code", "resourcebundle_get_error_message", "transliterator_create", "transliterator_create_from_rules", "transliterator_list_ids", "transliterator_create_inverse", "transliterator_transliterate", "transliterator_get_error_code", "transliterator_get_error_message", "intltz_create_time_zone", "intltz_from_date_time_zone", "intltz_create_default", "intltz_get_id", "intltz_get_gmt", "intltz_get_unknown", "intltz_create_enumeration", "intltz_count_equivalent_ids", "intltz_create_time_zone_id_enumeration", "intltz_get_canonical_id", "intltz_get_region", "intltz_get_tz_data_version", "intltz_get_equivalent_id", "intltz_use_daylight_time", "intltz_get_offset", "intltz_get_raw_offset", "intltz_has_same_rules", "intltz_get_display_name", "intltz_get_dst_savings", "intltz_to_date_time_zone", "intltz_get_error_code", "intltz_get_error_message", "intlcal_create_instance", "intlcal_get_keyword_values_for_locale", "intlcal_get_now", "intlcal_get_available_locales", "intlcal_get", "intlcal_get_time", "intlcal_set_time", "intlcal_add", "intlcal_set_time_zone", "intlcal_after", "intlcal_before", "intlcal_set", "intlcal_roll", "intlcal_clear", "intlcal_field_difference", "intlcal_get_actual_maximum", "intlcal_get_actual_minimum", "intlcal_get_day_of_week_type", "intlcal_get_first_day_of_week", "intlcal_get_greatest_minimum", "intlcal_get_least_maximum", "intlcal_get_locale", "intlcal_get_maximum", "intlcal_get_minimal_days_in_first_week", "intlcal_get_minimum", "intlcal_get_time_zone", "intlcal_get_type", "intlcal_get_weekend_transition", "intlcal_in_daylight_time", "intlcal_is_equivalent_to", "intlcal_is_lenient", "intlcal_is_set", "intlcal_is_weekend", "intlcal_set_first_day_of_week", "intlcal_set_lenient", "intlcal_set_minimal_days_in_first_week", "intlcal_equals", "intlcal_from_date_time", "intlcal_to_date_time", "intlcal_get_repeated_wall_time_option", "intlcal_get_skipped_wall_time_option", "intlcal_set_repeated_wall_time_option", "intlcal_set_skipped_wall_time_option", "intlcal_get_error_code", "intlcal_get_error_message", "intlgregcal_create_instance", "intlgregcal_set_gregorian_change", "intlgregcal_get_gregorian_change", "intlgregcal_is_leap_year", "intl_get_error_code", "intl_get_error_message", "intl_is_failure", "intl_error_name", "json_encode", "json_decode", "json_last_error", "json_last_error_msg", "ldap_connect", "ldap_close", "ldap_bind", "ldap_unbind", "ldap_read", "ldap_list", "ldap_search", "ldap_free_result", "ldap_count_entries", "ldap_first_entry", "ldap_next_entry", "ldap_get_entries", "ldap_first_attribute", "ldap_next_attribute", "ldap_get_attributes", "ldap_get_values", "ldap_get_values_len", "ldap_get_dn", "ldap_explode_dn", "ldap_dn2ufn", "ldap_add", "ldap_delete", "ldap_modify_batch", "ldap_modify", "ldap_mod_add", "ldap_mod_replace", "ldap_mod_del", "ldap_errno", "ldap_err2str", "ldap_error", "ldap_compare", "ldap_sort", "ldap_rename", "ldap_get_option", "ldap_set_option", "ldap_first_reference", "ldap_next_reference", "ldap_parse_reference", "ldap_parse_result", "ldap_start_tls", "ldap_set_rebind_proc", "ldap_escape", "ldap_control_paged_result", "ldap_control_paged_result_response", "mb_convert_case", "mb_strtoupper", "mb_strtolower", "mb_language", "mb_internal_encoding", "mb_http_input", "mb_http_output", "mb_detect_order", "mb_substitute_character", "mb_parse_str", "mb_output_handler", "mb_preferred_mime_name", "mb_strlen", "mb_strpos", "mb_strrpos", "mb_stripos", "mb_strripos", "mb_strstr", "mb_strrchr", "mb_stristr", "mb_strrichr", "mb_substr_count", "mb_substr", "mb_strcut", "mb_strwidth", "mb_strimwidth", "mb_convert_encoding", "mb_detect_encoding", "mb_list_encodings", "mb_encoding_aliases", "mb_convert_kana", "mb_encode_mimeheader", "mb_decode_mimeheader", "mb_convert_variables", "mb_encode_numericentity", "mb_decode_numericentity", "mb_send_mail", "mb_get_info", "mb_check_encoding", "mb_regex_encoding", "mb_regex_set_options", "mb_ereg", "mb_eregi", "mb_ereg_replace", "mb_eregi_replace", "mb_ereg_replace_callback", "mb_split", "mb_ereg_match", "mb_ereg_search", "mb_ereg_search_pos", "mb_ereg_search_regs", "mb_ereg_search_init", "mb_ereg_search_getregs", "mb_ereg_search_getpos", "mb_ereg_search_setpos", "mbregex_encoding", "mbereg", "mberegi", "mbereg_replace", "mberegi_replace", "mbsplit", "mbereg_match", "mbereg_search", "mbereg_search_pos", "mbereg_search_regs", "mbereg_search_init", "mbereg_search_getregs", "mbereg_search_getpos", "mbereg_search_setpos", "mysqli_affected_rows", "mysqli_autocommit", "mysqli_begin_transaction", "mysqli_change_user", "mysqli_character_set_name", "mysqli_close", "mysqli_commit", "mysqli_connect", "mysqli_connect_errno", "mysqli_connect_error", "mysqli_data_seek", "mysqli_dump_debug_info", "mysqli_debug", "mysqli_errno", "mysqli_error", "mysqli_error_list", "mysqli_stmt_execute", "mysqli_execute", "mysqli_fetch_field", "mysqli_fetch_fields", "mysqli_fetch_field_direct", "mysqli_fetch_lengths", "mysqli_fetch_all", "mysqli_fetch_array", "mysqli_fetch_assoc", "mysqli_fetch_object", "mysqli_fetch_row", "mysqli_field_count", "mysqli_field_seek", "mysqli_field_tell", "mysqli_free_result", "mysqli_get_connection_stats", "mysqli_get_client_stats", "mysqli_get_charset", "mysqli_get_client_info", "mysqli_get_client_version", "mysqli_get_links_stats", "mysqli_get_host_info", "mysqli_get_proto_info", "mysqli_get_server_info", "mysqli_get_server_version", "mysqli_get_warnings", "mysqli_init", "mysqli_info", "mysqli_insert_id", "mysqli_kill", "mysqli_more_results", "mysqli_multi_query", "mysqli_next_result", "mysqli_num_fields", "mysqli_num_rows", "mysqli_options", "mysqli_ping", "mysqli_poll", "mysqli_prepare", "mysqli_report", "mysqli_query", "mysqli_real_connect", "mysqli_real_escape_string", "mysqli_real_query", "mysqli_reap_async_query", "mysqli_release_savepoint", "mysqli_rollback", "mysqli_savepoint", "mysqli_select_db", "mysqli_set_charset", "mysqli_stmt_affected_rows", "mysqli_stmt_attr_get", "mysqli_stmt_attr_set", "mysqli_stmt_bind_param", "mysqli_stmt_bind_result", "mysqli_stmt_close", "mysqli_stmt_data_seek", "mysqli_stmt_errno", "mysqli_stmt_error", "mysqli_stmt_error_list", "mysqli_stmt_fetch", "mysqli_stmt_field_count", "mysqli_stmt_free_result", "mysqli_stmt_get_result", "mysqli_stmt_get_warnings", "mysqli_stmt_init", "mysqli_stmt_insert_id", "mysqli_stmt_more_results", "mysqli_stmt_next_result", "mysqli_stmt_num_rows", "mysqli_stmt_param_count", "mysqli_stmt_prepare", "mysqli_stmt_reset", "mysqli_stmt_result_metadata", "mysqli_stmt_send_long_data", "mysqli_stmt_store_result", "mysqli_stmt_sqlstate", "mysqli_sqlstate", "mysqli_ssl_set", "mysqli_stat", "mysqli_store_result", "mysqli_thread_id", "mysqli_thread_safe", "mysqli_use_result", "mysqli_warning_count", "mysqli_refresh", "mysqli_escape_string", "mysqli_set_opt", "spl_classes", "spl_autoload", "spl_autoload_extensions", "spl_autoload_register", "spl_autoload_unregister", "spl_autoload_functions", "spl_autoload_call", "class_parents", "class_implements", "class_uses", "spl_object_hash", "iterator_to_array", "iterator_count", "iterator_apply", "pdo_drivers", "posix_kill", "posix_getpid", "posix_getppid", "posix_getuid", "posix_setuid", "posix_geteuid", "posix_seteuid", "posix_getgid", "posix_setgid", "posix_getegid", "posix_setegid", "posix_getgroups", "posix_getlogin", "posix_getpgrp", "posix_setsid", "posix_setpgid", "posix_getpgid", "posix_getsid", "posix_uname", "posix_times", "posix_ctermid", "posix_ttyname", "posix_isatty", "posix_getcwd", "posix_mkfifo", "posix_mknod", "posix_access", "posix_getgrnam", "posix_getgrgid", "posix_getpwnam", "posix_getpwuid", "posix_getrlimit", "posix_setrlimit", "posix_get_last_error", "posix_errno", "posix_strerror", "posix_initgroups", "session_name", "session_module_name", "session_save_path", "session_id", "session_create_id", "session_regenerate_id", "session_decode", "session_encode", "session_start", "session_destroy", "session_unset", "session_gc", "session_set_save_handler", "session_cache_limiter", "session_cache_expire", "session_set_cookie_params", "session_get_cookie_params", "session_write_close", "session_abort", "session_reset", "session_status", "session_register_shutdown", "session_commit", "simplexml_load_file", "simplexml_load_string", "simplexml_import_dom", "use_soap_error_handler", "is_soap_fault", "socket_select", "socket_create", "socket_create_listen", "socket_create_pair", "socket_accept", "socket_set_nonblock", "socket_set_block", "socket_listen", "socket_close", "socket_write", "socket_read", "socket_getsockname", "socket_getpeername", "socket_connect", "socket_strerror", "socket_bind", "socket_recv", "socket_send", "socket_recvfrom", "socket_sendto", "socket_get_option", "socket_set_option", "socket_shutdown", "socket_last_error", "socket_clear_error", "socket_import_stream", "socket_export_stream", "socket_sendmsg", "socket_recvmsg", "socket_cmsg_space", "socket_getopt", "socket_setopt", "constant", "bin2hex", "hex2bin", "sleep", "usleep", "time_nanosleep", "time_sleep_until", "strptime", "flush", "wordwrap", "htmlspecialchars", "htmlentities", "html_entity_decode", "htmlspecialchars_decode", "get_html_translation_table", "sha1", "sha1_file", "md5", "md5_file", "crc32", "iptcparse", "iptcembed", "getimagesize", "getimagesizefromstring", "image_type_to_mime_type", "image_type_to_extension", "phpinfo", "phpversion", "phpcredits", "php_sapi_name", "php_uname", "php_ini_scanned_files", "php_ini_loaded_file", "strnatcmp", "strnatcasecmp", "substr_count", "strspn", "strcspn", "strtok", "strtoupper", "strtolower", "strpos", "stripos", "strrpos", "strripos", "strrev", "hebrev", "hebrevc", "nl2br", "basename", "dirname", "pathinfo", "stripslashes", "stripcslashes", "strstr", "stristr", "strrchr", "str_shuffle", "str_word_count", "str_split", "strpbrk", "substr_compare", "strcoll", "money_format", "substr", "substr_replace", "quotemeta", "ucfirst", "lcfirst", "ucwords", "strtr", "addslashes", "addcslashes", "rtrim", "str_replace", "str_ireplace", "str_repeat", "count_chars", "chunk_split", "trim", "ltrim", "strip_tags", "similar_text", "explode", "implode", "join", "setlocale", "localeconv", "nl_langinfo", "soundex", "levenshtein", "chr", "ord", "parse_str", "str_getcsv", "str_pad", "chop", "strchr", "sprintf", "printf", "vprintf", "vsprintf", "fprintf", "vfprintf", "sscanf", "fscanf", "parse_url", "urlencode", "urldecode", "rawurlencode", "rawurldecode", "http_build_query", "readlink", "linkinfo", "symlink", "link", "unlink", "exec", "system", "escapeshellcmd", "escapeshellarg", "passthru", "shell_exec", "proc_open", "proc_close", "proc_terminate", "proc_get_status", "proc_nice", "rand", "srand", "getrandmax", "mt_rand", "mt_srand", "mt_getrandmax", "random_bytes", "random_int", "getservbyname", "getservbyport", "getprotobyname", "getprotobynumber", "getmyuid", "getmygid", "getmypid", "getmyinode", "getlastmod", "base64_decode", "base64_encode", "password_hash", "password_get_info", "password_needs_rehash", "password_verify", "convert_uuencode", "convert_uudecode", "abs", "ceil", "floor", "round", "sin", "cos", "tan", "asin", "acos", "atan", "atanh", "atan2", "sinh", "cosh", "tanh", "asinh", "acosh", "expm1", "log1p", "pi", "is_finite", "is_nan", "is_infinite", "pow", "exp", "log", "log10", "sqrt", "hypot", "deg2rad", "rad2deg", "bindec", "hexdec", "octdec", "decbin", "decoct", "dechex", "base_convert", "number_format", "fmod", "intdiv", "inet_ntop", "inet_pton", "ip2long", "long2ip", "getenv", "putenv", "getopt", "sys_getloadavg", "microtime", "gettimeofday", "getrusage", "uniqid", "quoted_printable_decode", "quoted_printable_encode", "convert_cyr_string", "get_current_user", "set_time_limit", "header_register_callback", "get_cfg_var", "get_magic_quotes_gpc", "get_magic_quotes_runtime", "error_log", "error_get_last", "error_clear_last", "call_user_func", "call_user_func_array", "forward_static_call", "forward_static_call_array", "serialize", "unserialize", "var_dump", "var_export", "debug_zval_dump", "print_r", "memory_get_usage", "memory_get_peak_usage", "register_shutdown_function", "register_tick_function", "unregister_tick_function", "highlight_file", "show_source", "highlight_string", "php_strip_whitespace", "ini_get", "ini_get_all", "ini_set", "ini_alter", "ini_restore", "get_include_path", "set_include_path", "restore_include_path", "setcookie", "setrawcookie", "header", "header_remove", "headers_sent", "headers_list", "http_response_code", "connection_aborted", "connection_status", "ignore_user_abort", "parse_ini_file", "parse_ini_string", "is_uploaded_file", "move_uploaded_file", "gethostbyaddr", "gethostbyname", "gethostbynamel", "gethostname", "dns_check_record", "checkdnsrr", "dns_get_mx", "getmxrr", "dns_get_record", "intval", "floatval", "doubleval", "strval", "boolval", "gettype", "settype", "is_null", "is_resource", "is_bool", "is_int", "is_float", "is_integer", "is_long", "is_double", "is_real", "is_numeric", "is_string", "is_array", "is_object", "is_scalar", "is_callable", "is_iterable", "pclose", "popen", "readfile", "rewind", "rmdir", "umask", "fclose", "feof", "fgetc", "fgets", "fgetss", "fread", "fopen", "fpassthru", "ftruncate", "fstat", "fseek", "ftell", "fflush", "fwrite", "fputs", "mkdir", "rename", "copy", "tempnam", "tmpfile", "file", "file_get_contents", "file_put_contents", "stream_select", "stream_context_create", "stream_context_set_params", "stream_context_get_params", "stream_context_set_option", "stream_context_get_options", "stream_context_get_default", "stream_context_set_default", "stream_filter_prepend", "stream_filter_append", "stream_filter_remove", "stream_socket_client", "stream_socket_server", "stream_socket_accept", "stream_socket_get_name", "stream_socket_recvfrom", "stream_socket_sendto", "stream_socket_enable_crypto", "stream_socket_shutdown", "stream_socket_pair", "stream_copy_to_stream", "stream_get_contents", "stream_supports_lock", "fgetcsv", "fputcsv", "flock", "get_meta_tags", "stream_set_read_buffer", "stream_set_write_buffer", "set_file_buffer", "stream_set_chunk_size", "stream_set_blocking", "socket_set_blocking", "stream_get_meta_data", "stream_get_line", "stream_wrapper_register", "stream_register_wrapper", "stream_wrapper_unregister", "stream_wrapper_restore", "stream_get_wrappers", "stream_get_transports", "stream_resolve_include_path", "stream_is_local", "get_headers", "stream_set_timeout", "socket_set_timeout", "socket_get_status", "realpath", "fnmatch", "fsockopen", "pfsockopen", "pack", "unpack", "get_browser", "crypt", "opendir", "closedir", "chdir", "getcwd", "rewinddir", "readdir", "dir", "scandir", "glob", "fileatime", "filectime", "filegroup", "fileinode", "filemtime", "fileowner", "fileperms", "filesize", "filetype", "file_exists", "is_writable", "is_writeable", "is_readable", "is_executable", "is_file", "is_dir", "is_link", "stat", "lstat", "chown", "chgrp", "lchown", "lchgrp", "chmod", "touch", "clearstatcache", "disk_total_space", "disk_free_space", "diskfreespace", "realpath_cache_size", "realpath_cache_get", "mail", "ezmlm_hash", "openlog", "syslog", "closelog", "lcg_value", "metaphone", "ob_start", "ob_flush", "ob_clean", "ob_end_flush", "ob_end_clean", "ob_get_flush", "ob_get_clean", "ob_get_length", "ob_get_level", "ob_get_status", "ob_get_contents", "ob_implicit_flush", "ob_list_handlers", "ksort", "krsort", "natsort", "natcasesort", "asort", "arsort", "sort", "rsort", "usort", "uasort", "uksort", "shuffle", "array_walk", "array_walk_recursive", "count", "end", "prev", "next", "reset", "current", "key", "min", "max", "in_array", "array_search", "extract", "compact", "array_fill", "array_fill_keys", "range", "array_multisort", "array_push", "array_pop", "array_shift", "array_unshift", "array_splice", "array_slice", "array_merge", "array_merge_recursive", "array_replace", "array_replace_recursive", "array_keys", "array_values", "array_count_values", "array_column", "array_reverse", "array_reduce", "array_pad", "array_flip", "array_change_key_case", "array_rand", "array_unique", "array_intersect", "array_intersect_key", "array_intersect_ukey", "array_uintersect", "array_intersect_assoc", "array_uintersect_assoc", "array_intersect_uassoc", "array_uintersect_uassoc", "array_diff", "array_diff_key", "array_diff_ukey", "array_udiff", "array_diff_assoc", "array_udiff_assoc", "array_diff_uassoc", "array_udiff_uassoc", "array_sum", "array_product", "array_filter", "array_map", "array_chunk", "array_combine", "array_key_exists", "pos", "sizeof", "key_exists", "assert", "assert_options", "version_compare", "ftok", "str_rot13", "stream_get_filters", "stream_filter_register", "stream_bucket_make_writeable", "stream_bucket_prepend", "stream_bucket_append", "stream_bucket_new", "output_add_rewrite_var", "output_reset_rewrite_vars", "sys_get_temp_dir", "token_get_all", "token_name", "wddx_serialize_value", "wddx_serialize_vars", "wddx_packet_start", "wddx_packet_end", "wddx_add_vars", "wddx_deserialize", "xml_parser_create", "xml_parser_create_ns", "xml_set_object", "xml_set_element_handler", "xml_set_character_data_handler", "xml_set_processing_instruction_handler", "xml_set_default_handler", "xml_set_unparsed_entity_decl_handler", "xml_set_notation_decl_handler", "xml_set_external_entity_ref_handler", "xml_set_start_namespace_decl_handler", "xml_set_end_namespace_decl_handler", "xml_parse", "xml_parse_into_struct", "xml_get_error_code", "xml_error_string", "xml_get_current_line_number", "xml_get_current_column_number", "xml_get_current_byte_index", "xml_parser_free", "xml_parser_set_option", "xml_parser_get_option", "utf8_encode", "utf8_decode", "xmlwriter_open_uri", "xmlwriter_open_memory", "xmlwriter_set_indent", "xmlwriter_set_indent_string", "xmlwriter_start_comment", "xmlwriter_end_comment", "xmlwriter_start_attribute", "xmlwriter_end_attribute", "xmlwriter_write_attribute", "xmlwriter_start_attribute_ns", "xmlwriter_write_attribute_ns", "xmlwriter_start_element", "xmlwriter_end_element", "xmlwriter_full_end_element", "xmlwriter_start_element_ns", "xmlwriter_write_element", "xmlwriter_write_element_ns", "xmlwriter_start_pi", "xmlwriter_end_pi", "xmlwriter_write_pi", "xmlwriter_start_cdata", "xmlwriter_end_cdata", "xmlwriter_write_cdata", "xmlwriter_text", "xmlwriter_write_raw", "xmlwriter_start_document", "xmlwriter_end_document", "xmlwriter_write_comment", "xmlwriter_start_dtd", "xmlwriter_end_dtd", "xmlwriter_write_dtd", "xmlwriter_start_dtd_element", "xmlwriter_end_dtd_element", "xmlwriter_write_dtd_element", "xmlwriter_start_dtd_attlist", "xmlwriter_end_dtd_attlist", "xmlwriter_write_dtd_attlist", "xmlwriter_start_dtd_entity", "xmlwriter_end_dtd_entity", "xmlwriter_write_dtd_entity", "xmlwriter_output_memory", "xmlwriter_flush", "zip_open", "zip_close", "zip_read", "zip_entry_open", "zip_entry_close", "zip_entry_read", "zip_entry_filesize", "zip_entry_name", "zip_entry_compressedsize", "zip_entry_compressionmethod", "apache_lookup_uri", "virtual", "apache_request_headers", "apache_response_headers", "apache_setenv", "apache_getenv", "apache_note", "apache_get_version", "apache_get_modules", "getallheaders", "imap_open", "imap_reopen", "imap_close", "imap_num_msg", "imap_num_recent", "imap_headers", "imap_headerinfo", "imap_rfc822_parse_headers", "imap_rfc822_write_address", "imap_rfc822_parse_adrlist", "imap_body", "imap_bodystruct", "imap_fetchbody", "imap_fetchmime", "imap_savebody", "imap_fetchheader", "imap_fetchstructure", "imap_gc", "imap_expunge", "imap_delete", "imap_undelete", "imap_check", "imap_listscan", "imap_mail_copy", "imap_mail_move", "imap_mail_compose", "imap_createmailbox", "imap_renamemailbox", "imap_deletemailbox", "imap_subscribe", "imap_unsubscribe", "imap_append", "imap_ping", "imap_base64", "imap_qprint", "imap_8bit", "imap_binary", "imap_utf8", "imap_status", "imap_mailboxmsginfo", "imap_setflag_full", "imap_clearflag_full", "imap_sort", "imap_uid", "imap_msgno", "imap_list", "imap_lsub", "imap_fetch_overview", "imap_alerts", "imap_errors", "imap_last_error", "imap_search", "imap_utf7_decode", "imap_utf7_encode", "imap_utf8_to_mutf7", "imap_mutf7_to_utf8", "imap_mime_header_decode", "imap_thread", "imap_timeout", "imap_get_quota", "imap_get_quotaroot", "imap_set_quota", "imap_setacl", "imap_getacl", "imap_mail", "imap_header", "imap_listmailbox", "imap_getmailboxes", "imap_scanmailbox", "imap_listsubscribed", "imap_getsubscribed", "imap_fetchtext", "imap_scan", "imap_create", "imap_rename", "mcrypt_get_key_size", "mcrypt_get_block_size", "mcrypt_get_cipher_name", "mcrypt_create_iv", "mcrypt_list_algorithms", "mcrypt_list_modes", "mcrypt_get_iv_size", "mcrypt_encrypt", "mcrypt_decrypt", "mcrypt_module_open", "mcrypt_generic_init", "mcrypt_generic", "mdecrypt_generic", "mcrypt_generic_deinit", "mcrypt_enc_self_test", "mcrypt_enc_is_block_algorithm_mode", "mcrypt_enc_is_block_algorithm", "mcrypt_enc_is_block_mode", "mcrypt_enc_get_block_size", "mcrypt_enc_get_key_size", "mcrypt_enc_get_supported_key_sizes", "mcrypt_enc_get_iv_size", "mcrypt_enc_get_algorithms_name", "mcrypt_enc_get_modes_name", "mcrypt_module_self_test", "mcrypt_module_is_block_algorithm_mode", "mcrypt_module_is_block_algorithm", "mcrypt_module_is_block_mode", "mcrypt_module_get_algo_block_size", "mcrypt_module_get_algo_key_size", "mcrypt_module_get_supported_key_sizes", "mcrypt_module_close", "textdomain", "gettext", "_", "dgettext", "dcgettext", "bindtextdomain", "ngettext", "dngettext", "dcngettext", "bind_textdomain_codeset", "pg_connect", "pg_pconnect", "pg_connect_poll", "pg_close", "pg_connection_status", "pg_connection_busy", "pg_connection_reset", "pg_host", "pg_dbname", "pg_port", "pg_tty", "pg_options", "pg_version", "pg_ping", "pg_parameter_status", "pg_transaction_status", "pg_query", "pg_query_params", "pg_prepare", "pg_execute", "pg_send_query", "pg_send_query_params", "pg_send_prepare", "pg_send_execute", "pg_cancel_query", "pg_fetch_result", "pg_fetch_row", "pg_fetch_assoc", "pg_fetch_array", "pg_fetch_object", "pg_fetch_all", "pg_fetch_all_columns", "pg_affected_rows", "pg_get_result", "pg_result_seek", "pg_result_status", "pg_free_result", "pg_last_oid", "pg_num_rows", "pg_num_fields", "pg_field_name", "pg_field_num", "pg_field_size", "pg_field_type", "pg_field_type_oid", "pg_field_prtlen", "pg_field_is_null", "pg_field_table", "pg_get_notify", "pg_socket", "pg_consume_input", "pg_flush", "pg_get_pid", "pg_result_error", "pg_result_error_field", "pg_last_error", "pg_last_notice", "pg_put_line", "pg_end_copy", "pg_copy_to", "pg_copy_from", "pg_trace", "pg_untrace", "pg_lo_create", "pg_lo_unlink", "pg_lo_open", "pg_lo_close", "pg_lo_read", "pg_lo_write", "pg_lo_read_all", "pg_lo_import", "pg_lo_export", "pg_lo_seek", "pg_lo_tell", "pg_lo_truncate", "pg_escape_string", "pg_escape_bytea", "pg_unescape_bytea", "pg_escape_literal", "pg_escape_identifier", "pg_set_error_verbosity", "pg_client_encoding", "pg_set_client_encoding", "pg_meta_data", "pg_convert", "pg_insert", "pg_update", "pg_delete", "pg_select", "pg_exec", "pg_getlastoid", "pg_cmdtuples", "pg_errormessage", "pg_numrows", "pg_numfields", "pg_fieldname", "pg_fieldsize", "pg_fieldtype", "pg_fieldnum", "pg_fieldprtlen", "pg_fieldisnull", "pg_freeresult", "pg_result", "pg_loreadall", "pg_locreate", "pg_lounlink", "pg_loopen", "pg_loclose", "pg_loread", "pg_lowrite", "pg_loimport", "pg_loexport", "pg_clientencoding", "pg_setclientencoding"],
	}
	var selectedList= lists['js-libs'];

	function endGame(){
		flags.gameStarted= false;
		input.blur();

		mightness.style.height= '0%';
		flags= {
			gameStarted: false,
			currentLevel: flags.currentLevel,
			currentTime: 0,
			timeLimit: 10,
			hitting: false
		};
		input.value= '';
	}

	function countDown(){
		if(!flags.gameStarted){ return; }
		flags.currentTime--;
		timer.innerHTML= flags.currentTime;
		if(flags.currentTime === 0){
			hit();
		}else{
			setTimeout(countDown, 1000);
		}
	}

	function startGame(){
		var b= document.body;
		b.classList.add('game-started');
		b.classList.add('waiting');
		hitEnergy= energy= 0;
		energyTarget= levels[flags.currentLevel];
		timer.innerHTML= flags.currentTime;
		curLevelLabel.innerHTML= 'Level:<br/><strong>'+levelLabels[flags.currentLevel] +'</strong>';
		document.querySelector('.how-to-content').classList.remove('showing');
		b.setAttribute('data-power-needed', Math.ceil((energyTarget/10)/2));
		setTimeout(function(){
			b.classList.remove('waiting');
			flags.currentTime= flags.timeLimit + (flags.currentLevel * 6);
			setTimeout(dryOut, speed);
			setTimeout(countDown, 1000);
			input.focus();
			selectedList= lists[tableset.value].slice(0);
			energyBurn= selectedList.join('').length / (selectedList.length * 30);
			flags.gameStarted= true;
		}, 1200);
	}

	function restartGame(){
		endGame();
		body.removeAttribute('data-power-range');
		body.removeAttribute('data-power-needed');
		body.className= '';
		flags.currentLevel= 0;
		finalResult.style.display= 'none';
		usedWords.innerHTML= '';
		startGame();
	}

	function youAreImpressive(){
		body.classList.add('iamimpressedbyyourmarkup');
	};
	window.youAreImpressive= youAreImpressive;

	function hitted(){
		var r= finalResult;
		body.classList.add('hitted');
		var btnEl= document.createElement('input');
		btnEl.type= 'button';

		if(hitEnergy >= energyTarget){
			body.classList.add('broken');
			r.innerHTML= 'Success';
			if(flags.currentLevel +1 < levels.length){
				btnEl.value= 'Next';
				btnEl.addEventListener('click', function(){
					if(flags.currentLevel < 5){
						flags.currentLevel++;
					}else{
						youAreImpressive();
					}
					body.classList.remove('hitted', 'half-broken', 'broken');
					finalResult.style.display= 'none';
					startGame();
				});
			}else{
				youAreImpressive();
				//btnEl.value= 'Start again';
				//btnEl.addEventListener('click', restartGame);
			}
		}else{
			body.classList.add('half-broken');
			r.innerHTML= 'You Fail';
			btnEl.value= 'Retry';
			btnEl.addEventListener('click', restartGame);
		}
		r.appendChild(btnEl);
		r.style.display= 'block';
		//setTimeout(function(){r.style.display= 'none'; restartGame();}, 3000);
	}

	function goUpAndDown(current, goindDown){
		current= current || body.getAttribute('data-power-range');
		var time= 30;
		if(current < 5 && !goindDown){
			current++;
		}else if(current === 5 && !goindDown){
			goindDown= true;
			time= 500;
		}else if(current > 0){
			current--;
		}else{
			hitted();
			return
		}
		body.setAttribute('data-power-range', current);
		setTimeout(function(){goUpAndDown(current, goindDown)}, time);
	}

	function hit(status){
		flags.hitting= true;
		hitEnergy= energy;
		input.blur();

		setTimeout(function(){endGame(); goUpAndDown(); }, 200);
	}

	function dryOut(){
		if(!flags.gameStarted){ return; }

		energy-= energyBurn;
		if(energy >= 100){
			energy= 100;
		}
		if(energy <= 0){
			energy= 0;
			if(flags.hitting){
				mightness.style.height= '0%';
			}
		}
		setTimeout(dryOut, speed);
		var r= Math.ceil(energy / range);
		if(currentRange != r){
			body.setAttribute('data-power-range', r);
			currentRange= r;
		}
		mightness.style.height= energy+'%';
	}

	// start game
	startTrigger.addEventListener('click', startGame);

	function setOk(val){

		cl.add('successWord');
		var newLi= document.createElement('li');

		energy+= val.length * 2;
		if(energy > 100){
			energy= 100;
		}

		selectedList.splice(selectedList.indexOf(val), 1);
		newLi.innerHTML= '&nbsp;'+val+'&nbsp;';
		usedWords.appendChild(newLi);

		if(energy > energyTarget){
			hit();
		}
		setTimeout(function(){
			if(cl.contains('successWord')){
				input.value= '';
				cl.remove('successWord');
			}
		}, 400);
	}

	function setFail(val){
		cl.add('failWord');
		input.blur();
		setTimeout(function(){
			cl.remove('failWord');
			input.focus();
		}, 400);
	}

	body.addEventListener('keydown', function(evt){
		if(evt.keyCode == 8 && evt.target.tagName != 'INPUT'){
			evt.preventDefault();
			evt.stopPropagation();
			return false;
		}
	});

	input.addEventListener('keydown', function(evt){
		if(flags.gameStarted && !flags.hitting){
			var v= this.value;
			if(cl.contains('successWord')){
				cl.remove('successWord');
				this.value= '';
			}

			if(evt.keyCode == 13){
				if(selectedList.indexOf(this.value.toLowerCase()) >= 0){
					setOk(this.value);
				}else{
					setFail();
				}
			}
		}
	});

	function cancelGame(){
		endGame();
		body.className= '';
		finalResult.style.display= 'none';
		usedWords.innerHTML= '';
	}

	document.querySelector('.how-to-label').addEventListener('click', function(){
		this.parentNode.getElementsByTagName('ul')[0].classList.add('showing');
	});
	document.querySelector('.how-to-content input').addEventListener('click', function(){
		this.parentNode.classList.remove('showing');
	});
	giveUpBtn.addEventListener('click', function(){
		cancelGame();
	});
}(this);
